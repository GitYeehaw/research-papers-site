#!/usr/bin/env python3
"""
dblp_yale_coauthors.py

Find publications where a set of target authors (e.g., Stanford faculty)
coauthor with any person in a provided Yale faculty list, using DBLP.

DBLP does NOT reliably include affiliations in the publication XML.
So "Yale affiliation" here is implemented as:
  - name matches against your curated Yale faculty list (most defensible), and/or
  - OPTIONAL: OpenAlex lookup to validate the matched author is (currently) affiliated with Yale.

Usage examples:
  python dblp_yale_coauthors.py
  python dblp_yale_coauthors.py --targets "Chelsea Finn" "Jeannette Bohg" "Fei-Fei Li"
  python dblp_yale_coauthors.py --yale-file yale_faculty.txt
  python dblp_yale_coauthors.py --openalex --openalex-cache openalex_cache.json

Outputs:
  - coauthor_hits.csv
  - coauthor_hits.json
"""

from __future__ import annotations

import argparse
import csv
import difflib
import json
import re
import sys
import time
import unicodedata
from dataclasses import asdict, dataclass
from typing import Dict, Iterable, List, Optional, Set, Tuple

import requests
import xml.etree.ElementTree as ET


DBLP_AUTHOR_SEARCH = "https://dblp.org/search/author/api"
DBLP_PID_XML = "https://dblp.org/pid/{pid}.xml"
DBLP_REC_URL = "https://dblp.org/rec/{key}"

OPENALEX_AUTHOR_SEARCH = "https://api.openalex.org/authors"
DEFAULT_UA = "dblp_yale_coauthors/1.0 (contact: you@example.com)"


def normalize_name(s: str) -> str:
    s = unicodedata.normalize("NFKD", s)
    s = "".join(ch for ch in s if not unicodedata.combining(ch))
    s = s.lower()
    s = re.sub(r"[^a-z0-9\s\-]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def best_name_match(query: str, candidates: List[str]) -> Tuple[str, float]:
    """Return (best_candidate, score) using a simple similarity ratio."""
    q = normalize_name(query)
    best = ("", 0.0)
    for c in candidates:
        score = difflib.SequenceMatcher(a=q, b=normalize_name(c)).ratio()
        if score > best[1]:
            best = (c, score)
    return best


@dataclass
class CoauthorHit:
    target_name: str
    target_pid: str
    year: Optional[str]
    title: Optional[str]
    venue: Optional[str]
    dblp_key: Optional[str]
    dblp_url: Optional[str]
    yale_matches: List[str]
    authors: List[str]


def http_get_json(url: str, params: dict, timeout: int = 30, ua: str = DEFAULT_UA) -> dict:
    r = requests.get(url, params=params, timeout=timeout, headers={"User-Agent": ua})
    r.raise_for_status()
    return r.json()


def http_get_text(url: str, timeout: int = 30, ua: str = DEFAULT_UA) -> str:
    r = requests.get(url, timeout=timeout, headers={"User-Agent": ua})
    r.raise_for_status()
    return r.text


def search_dblp_author_pid(name: str, ua: str = DEFAULT_UA) -> str:
    """
    Search DBLP for an author name and pick the best PID.
    Strategy:
      1) Prefer exact normalized name match if present
      2) Else pick the top hit (DBLP returns ranked hits)
    """
    data = http_get_json(
        DBLP_AUTHOR_SEARCH,
        params={"q": name, "format": "json"},
        ua=ua,
    )

    hits = (
        data.get("result", {})
        .get("hits", {})
        .get("hit", [])
    )
    if isinstance(hits, dict):
        hits = [hits]

    if not hits:
        raise RuntimeError(f"No DBLP author hits found for: {name}")

    # Collect hit info
    candidates = []
    for h in hits:
        info = h.get("info", {})
        author = info.get("author")
        url = info.get("url")  # typically https://dblp.org/pid/xx/yy
        if author and url and "/pid/" in url:
            pid = url.split("/pid/")[-1].strip("/")
            candidates.append((author, pid, url))

    if not candidates:
        raise RuntimeError(f"No usable DBLP PID URLs found for: {name}")

    # Prefer exact normalized match
    nname = normalize_name(name)
    for author, pid, _url in candidates:
        if normalize_name(author) == nname:
            return pid

    # Otherwise pick best similarity among candidate names
    cand_names = [c[0] for c in candidates]
    best_cand_name, _score = best_name_match(name, cand_names)
    for author, pid, _url in candidates:
        if author == best_cand_name:
            return pid

    # Fallback top
    return candidates[0][1]


def parse_dblp_pid_xml(pid: str, ua: str = DEFAULT_UA) -> List[dict]:
    """
    Fetch and parse DBLP PID XML into a list of publication dicts:
      {key, title, year, venue, authors[]}
    """
    xml_text = http_get_text(DBLP_PID_XML.format(pid=pid), ua=ua)
    root = ET.fromstring(xml_text)

    pubs: List[dict] = []

    # DBLP PID XML is like: <dblpperson> ... <r> <article>...</article> </r> ...
    for r in root.findall(".//r"):
        # Each <r> contains exactly one publication node of various types
        pub_node = None
        for child in list(r):
            pub_node = child
            break
        if pub_node is None:
            continue

        key = pub_node.attrib.get("key")

        # Authors
        authors = [a.text.strip() for a in pub_node.findall("./author") if a.text]
        if not authors:
            # Some entries use editor instead of author; rarely relevant for your use, but include.
            authors = [e.text.strip() for e in pub_node.findall("./editor") if e.text]

        title_el = pub_node.find("./title")
        year_el = pub_node.find("./year")

        title = title_el.text.strip() if (title_el is not None and title_el.text) else None
        year = year_el.text.strip() if (year_el is not None and year_el.text) else None

        # Venue heuristics
        venue = None
        for tag in ("journal", "booktitle", "publisher", "school"):
            el = pub_node.find(f"./{tag}")
            if el is not None and el.text:
                venue = el.text.strip()
                break

        pubs.append(
            {
                "key": key,
                "title": title,
                "year": year,
                "venue": venue,
                "authors": authors,
            }
        )

    return pubs


def load_yale_names(path: Optional[str]) -> List[str]:
    if not path:
        # A reasonable default seed list (edit freely)
        return [
            "Alex Wong",
            "Daniel Rakita",
            "Aaron M. Dollar",
            "Aaron Dollar",
            "Rebecca Kramer-Bottiglio",
            "Brian Scassellati",
            "Marynel Vázquez",
            "Tesca Fitzgerald",
        ]
    with open(path, "r", encoding="utf-8") as f:
        names = [line.strip() for line in f if line.strip() and not line.strip().startswith("#")]
    return names


def match_yale_authors(pub_authors: List[str], yale_names: List[str], min_score: float) -> List[str]:
    """
    Return Yale names matched to this publication's author list.
    We:
      - normalize and attempt exact match
      - then fuzzy match each author to Yale list
    """
    yale_norm_map = {normalize_name(n): n for n in yale_names}
    yale_norms = list(yale_norm_map.keys())

    hits: Set[str] = set()

    for a in pub_authors:
        an = normalize_name(a)
        if an in yale_norm_map:
            hits.add(yale_norm_map[an])
            continue

        # Fuzzy: compare this author name against Yale list
        best_norm = ""
        best_score = 0.0
        for yn in yale_norms:
            score = difflib.SequenceMatcher(a=an, b=yn).ratio()
            if score > best_score:
                best_score = score
                best_norm = yn
        if best_score >= min_score and best_norm in yale_norm_map:
            hits.add(yale_norm_map[best_norm])

    return sorted(hits)


def openalex_is_yale_affiliated(name: str, cache: Dict[str, bool], ua: str, sleep_s: float = 0.2) -> bool:
    """
    OPTIONAL: Validate a matched author's CURRENT affiliation includes Yale University via OpenAlex.
    This is NOT perfect, but gives an extra evidence layer beyond name matching.

    We cache by normalized name to avoid repeated calls.
    """
    nn = normalize_name(name)
    if nn in cache:
        return cache[nn]

    params = {
        "search": name,
        "per-page": 5,
    }
    try:
        data = http_get_json(OPENALEX_AUTHOR_SEARCH, params=params, ua=ua)
    except Exception:
        cache[nn] = False
        return False

    results = data.get("results", []) or []
    # Pick best name similarity among returned authors
    best = None
    best_score = 0.0
    for r in results:
        display_name = r.get("display_name", "")
        if not display_name:
            continue
        score = difflib.SequenceMatcher(a=normalize_name(name), b=normalize_name(display_name)).ratio()
        if score > best_score:
            best_score = score
            best = r

    is_yale = False
    if best and best_score >= 0.75:
        inst = (best.get("last_known_institution") or {}).get("display_name", "")
        if inst and "yale" in inst.lower():
            is_yale = True

        # Also consider affiliations list if present
        for aff in best.get("affiliations", []) or []:
            inst_name = ((aff.get("institution") or {}).get("display_name")) or ""
            if inst_name and "yale" in inst_name.lower():
                is_yale = True
                break

    cache[nn] = is_yale
    time.sleep(sleep_s)
    return is_yale


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument(
        "--targets",
        nargs="+",
        default=["Jeannette Bohg", "Chelsea Finn", "Fei-Fei Li"],
        help="Target author names to search on DBLP.",
    )
    p.add_argument(
        "--yale-file",
        default=None,
        help="Path to a text file with Yale faculty names (one per line). Lines starting with # are ignored.",
    )
    p.add_argument(
        "--min-score",
        type=float,
        default=0.90,
        help="Fuzzy match threshold (0-1) when matching publication authors to Yale names.",
    )
    p.add_argument(
        "--sleep",
        type=float,
        default=0.2,
        help="Sleep between network calls (seconds). Be polite to DBLP/OpenAlex.",
    )
    p.add_argument(
        "--openalex",
        action="store_true",
        help="Optionally validate matched authors' current affiliation via OpenAlex (extra evidence layer).",
    )
    p.add_argument(
        "--openalex-cache",
        default="openalex_cache.json",
        help="Cache file for OpenAlex affiliation checks.",
    )
    p.add_argument(
        "--user-agent",
        default=DEFAULT_UA,
        help="Custom User-Agent header for HTTP requests.",
    )
    p.add_argument(
        "--pid-map",
        nargs="+",
        default=[],
        metavar="NAME=PID",
        help="Pin a DBLP PID for a target author, bypassing search. E.g. --pid-map \"Fei-Fei Li=79/2528\"",
    )
    args = p.parse_args()

    # Build name→pid override dict
    pid_overrides: Dict[str, str] = {}
    for entry in args.pid_map:
        if "=" not in entry:
            print(f"!! Ignoring malformed --pid-map entry (expected Name=pid): {entry}")
            continue
        name_part, pid_part = entry.split("=", 1)
        pid_overrides[name_part.strip()] = pid_part.strip()

    yale_names = load_yale_names(args.yale_file)

    # Optional OpenAlex cache
    openalex_cache: Dict[str, bool] = {}
    if args.openalex:
        try:
            with open(args.openalex_cache, "r", encoding="utf-8") as f:
                openalex_cache = json.load(f)
        except Exception:
            openalex_cache = {}

    hits: List[CoauthorHit] = []

    for tname in args.targets:
        print(f"\n=== Target: {tname} ===")
        if tname in pid_overrides:
            pid = pid_overrides[tname]
            print(f"DBLP PID (pinned): {pid}")
        else:
            try:
                pid = search_dblp_author_pid(tname, ua=args.user_agent)
            except Exception as e:
                print(f"!! Failed to resolve DBLP PID for {tname}: {e}")
                continue

        if tname not in pid_overrides:
            print(f"DBLP PID: {pid}")
        time.sleep(args.sleep)

        try:
            pubs = parse_dblp_pid_xml(pid, ua=args.user_agent)
        except Exception as e:
            print(f"!! Failed to fetch/parse DBLP publications for {tname} ({pid}): {e}")
            continue

        print(f"Publications found: {len(pubs)}")

        for pub in pubs:
            authors = pub.get("authors") or []
            yale_matches = match_yale_authors(authors, yale_names, min_score=args.min_score)

            if not yale_matches:
                continue

            # Optional: validate Yale affiliation via OpenAlex for each match
            if args.openalex:
                yale_matches_validated = []
                for ym in yale_matches:
                    ok = openalex_is_yale_affiliated(ym, cache=openalex_cache, ua=args.user_agent)
                    if ok:
                        yale_matches_validated.append(ym)
                yale_matches = yale_matches_validated
                if not yale_matches:
                    continue

            key = pub.get("key")
            url = DBLP_REC_URL.format(key=key) if key else None

            hits.append(
                CoauthorHit(
                    target_name=tname,
                    target_pid=pid,
                    year=pub.get("year"),
                    title=pub.get("title"),
                    venue=pub.get("venue"),
                    dblp_key=key,
                    dblp_url=url,
                    yale_matches=yale_matches,
                    authors=authors,
                )
            )

    # Save outputs
    out_csv = "coauthor_hits.csv"
    out_json = "coauthor_hits.json"

    with open(out_csv, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(
            [
                "target_name",
                "target_pid",
                "year",
                "title",
                "venue",
                "dblp_key",
                "dblp_url",
                "yale_matches",
                "authors",
            ]
        )
        for h in hits:
            w.writerow(
                [
                    h.target_name,
                    h.target_pid,
                    h.year or "",
                    h.title or "",
                    h.venue or "",
                    h.dblp_key or "",
                    h.dblp_url or "",
                    "; ".join(h.yale_matches),
                    "; ".join(h.authors),
                ]
            )

    with open(out_json, "w", encoding="utf-8") as f:
        json.dump([asdict(h) for h in hits], f, indent=2, ensure_ascii=False)

    if args.openalex:
        with open(args.openalex_cache, "w", encoding="utf-8") as f:
            json.dump(openalex_cache, f, indent=2, ensure_ascii=False)

    print(f"\nDone. Hits: {len(hits)}")
    print(f"Wrote: {out_csv}")
    print(f"Wrote: {out_json}")
    if args.openalex:
        print(f"Updated OpenAlex cache: {args.openalex_cache}")

    # Helpful next step guidance
    if len(hits) == 0:
        print(
            "\nNo matches found with the current Yale name list.\n"
            "Try:\n"
            "  - Expanding --yale-file to include more Yale faculty name variants\n"
            "  - Lowering --min-score slightly (e.g., 0.88)\n"
            "  - Adding middle initials / alternate spellings in yale_faculty.txt\n"
            "  - Running with --openalex OFF first (to see raw name-based hits)\n"
        )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
