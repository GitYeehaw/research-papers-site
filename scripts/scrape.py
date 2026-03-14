#!/usr/bin/env python3
"""
arXiv Paper Scraper
Fetches the latest research papers from arXiv for each configured category.
Outputs JSON files to the data/ directory for the Next.js site to consume at build time.
"""

import json
import os
import sys
import time
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
CONFIG_PATH = os.path.join(SCRIPT_DIR, "config.json")
RESEARCHERS_PATH = os.path.join(SCRIPT_DIR, "researchers.json")
DATA_DIR = os.path.join(PROJECT_ROOT, "data")

ARXIV_API_URL = "http://export.arxiv.org/api/query"

# arXiv Atom namespace
ATOM_NS = "{http://www.w3.org/2005/Atom}"
ARXIV_NS = "{http://arxiv.org/schemas/atom}"


def load_config():
    with open(CONFIG_PATH, "r") as f:
        return json.load(f)


def fetch_arxiv_papers(query: str, max_results: int = 10) -> list[dict]:
    """Fetch papers from arXiv API using the Atom feed."""
    params = urllib.parse.urlencode({
        "search_query": query,
        "start": 0,
        "max_results": max_results,
        "sortBy": "submittedDate",
        "sortOrder": "descending",
    })

    url = f"{ARXIV_API_URL}?{params}"
    print(f"  Fetching: {url}")

    xml_data = None
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "ResearchPapersSite/1.0"})
            with urllib.request.urlopen(req, timeout=30) as response:
                xml_data = response.read().decode("utf-8")
            break
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < 2:
                wait = 10 * (attempt + 1)
                print(f"  Rate limited (429), retrying in {wait}s...")
                time.sleep(wait)
            else:
                print(f"  ERROR fetching from arXiv: {e}")
                return []
        except Exception as e:
            if attempt < 2:
                wait = 10 * (attempt + 1)
                print(f"  Request failed ({e}), retrying in {wait}s...")
                time.sleep(wait)
            else:
                print(f"  ERROR fetching from arXiv: {e}")
                return []

    if xml_data is None:
        return []

    # Parse XML
    root = ET.fromstring(xml_data)
    papers = []

    for entry in root.findall(f"{ATOM_NS}entry"):
        title_el = entry.find(f"{ATOM_NS}title")
        summary_el = entry.find(f"{ATOM_NS}summary")
        published_el = entry.find(f"{ATOM_NS}published")
        updated_el = entry.find(f"{ATOM_NS}updated")

        # Get the abstract page link (not the PDF)
        paper_url = ""
        pdf_url = ""
        for link in entry.findall(f"{ATOM_NS}link"):
            href = link.get("href", "")
            if link.get("type") == "text/html" or (link.get("rel") == "alternate"):
                paper_url = href
            if link.get("title") == "pdf":
                pdf_url = href

        # Authors
        authors = []
        for author in entry.findall(f"{ATOM_NS}author"):
            name_el = author.find(f"{ATOM_NS}name")
            if name_el is not None and name_el.text:
                authors.append(name_el.text.strip())

        # Categories
        categories = []
        for cat in entry.findall(f"{ATOM_NS}category"):
            term = cat.get("term", "")
            if term:
                categories.append(term)

        # Primary category
        primary_cat_el = entry.find(f"{ARXIV_NS}primary_category")
        primary_category = primary_cat_el.get("term", "") if primary_cat_el is not None else ""

        # arXiv ID
        id_el = entry.find(f"{ATOM_NS}id")
        arxiv_id = ""
        if id_el is not None and id_el.text:
            arxiv_id = id_el.text.strip().split("/abs/")[-1]

        title = title_el.text.strip().replace("\n", " ") if title_el is not None and title_el.text else "Untitled"
        abstract = summary_el.text.strip().replace("\n", " ") if summary_el is not None and summary_el.text else ""
        published = published_el.text.strip() if published_el is not None and published_el.text else ""
        updated = updated_el.text.strip() if updated_el is not None and updated_el.text else ""

        papers.append({
            "id": arxiv_id,
            "title": title,
            "authors": authors,
            "abstract": abstract,
            "url": paper_url,
            "pdf_url": pdf_url,
            "published": published,
            "updated": updated,
            "categories": categories,
            "primary_category": primary_category,
        })

    return papers


def prioritize_lab_papers(papers: list[dict], labs: list[dict]) -> list[dict]:
    """Move papers from specified labs/authors to the top of the list."""
    if not labs:
        return papers

    # Collect all author names and keywords to prioritize
    priority_authors = set()
    priority_keywords = set()
    for lab in labs:
        for author in lab.get("authors", []):
            priority_authors.add(author.lower())
        for kw in lab.get("keywords", []):
            priority_keywords.add(kw.lower())

    def is_priority(paper):
        # Check authors
        for author in paper["authors"]:
            if author.lower() in priority_authors:
                return True
        # Check keywords in title/abstract
        text = (paper["title"] + " " + paper["abstract"]).lower()
        for kw in priority_keywords:
            if kw in text:
                return True
        return False

    priority = [p for p in papers if is_priority(p)]
    regular = [p for p in papers if not is_priority(p)]

    return priority + regular


def scrape_researchers():
    """Fetch latest papers for each tracked researcher and write data/researchers.json."""
    if not os.path.exists(RESEARCHERS_PATH):
        print("  No researchers.json found, skipping.")
        return

    with open(RESEARCHERS_PATH, "r") as f:
        researchers = json.load(f)

    results = []
    for researcher in researchers:
        name = researcher["name"]
        arxiv_id = researcher["arxiv_id"]
        print(f"  [{name}]")

        query = researcher.get("arxiv_query") or f"au:{arxiv_id}"
        papers = fetch_arxiv_papers(query, max_results=5)
        print(f"    Found {len(papers)} papers")

        results.append({
            "id": arxiv_id,
            "name": name,
            "field": researcher.get("field", ""),
            "institution": researcher.get("institution", ""),
            "website": researcher.get("website", ""),
            "paper_count": len(papers),
            "papers": papers,
        })

        time.sleep(5)

    output = {
        "scraped_at": datetime.now(timezone.utc).isoformat(),
        "researcher_count": len(results),
        "researchers": results,
    }

    output_path = os.path.join(DATA_DIR, "researchers.json")
    with open(output_path, "w") as f:
        json.dump(output, f, indent=2)
    print(f"  Saved to {output_path}")


def main():
    print("=" * 60)
    print(f"arXiv Paper Scraper — {datetime.now(timezone.utc).isoformat()}")
    print("=" * 60)

    config = load_config()
    categories = config["categories"]

    os.makedirs(DATA_DIR, exist_ok=True)

    for key, cat_config in categories.items():
        print(f"\n[{cat_config['name']}]")
        query = cat_config["arxiv_query"]
        max_results = cat_config.get("max_results", 10)
        labs = cat_config.get("labs", [])

        papers = fetch_arxiv_papers(query, max_results)
        papers = prioritize_lab_papers(papers, labs)

        print(f"  Found {len(papers)} papers")

        output = {
            "category": key,
            "name": cat_config["name"],
            "description": cat_config["description"],
            "scraped_at": datetime.now(timezone.utc).isoformat(),
            "paper_count": len(papers),
            "papers": papers,
        }

        output_path = os.path.join(DATA_DIR, f"{key}.json")
        with open(output_path, "w") as f:
            json.dump(output, f, indent=2)
        print(f"  Saved to {output_path}")

        # Be polite to the arXiv API — wait between requests
        time.sleep(5)

    print(f"\n[Researchers]")
    scrape_researchers()

    print(f"\nDone! Data files written to {DATA_DIR}/")


if __name__ == "__main__":
    main()
