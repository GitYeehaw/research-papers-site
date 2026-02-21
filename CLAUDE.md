# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the **Research Hub** — a static GitHub Pages site that auto-scrapes academic papers from the arXiv API and displays them across research categories (CS, Biology, Electrochemistry, Physics).

The main project files live in `Code/research-hub-site.zip` (or unzipped as `research-hub-site/`).

## Running Locally

```bash
# Serve the static site
python -m http.server 8000
# Visit http://localhost:8000

# Manually run the paper scraper
python scripts/scrape_papers.py
```

## Architecture

**Data flow:** arXiv API → `scripts/scrape_papers.py` → `data/*.json` → git commit → GitHub Pages serves the site → `js/app.js` loads JSON at runtime.

**Key files:**
- `scripts/scrape_papers.py` — Python stdlib-only scraper; `CATEGORIES` dict controls which arXiv subcategories are fetched
- `js/app.js` — Client-side router (hash-based: `#cs`, `#physics`, etc.) and data loading; `PROJECTS` array defines the Projects page content
- `css/style.css` — All styling via CSS custom properties at the top of the file
- `data/manifest.json` — Metadata listing available paper categories
- `.github/workflows/scrape.yml` — Runs scraper daily at 6 AM UTC, auto-commits updated JSON

**Design constraints:**
- Zero frontend dependencies (no npm, no build step, no frameworks)
- Python scraper uses stdlib only (`urllib`, `xml.etree`, `json`) — no `pip install` needed
- arXiv API requests include 3-second delays for rate limiting; papers are deduplicated by arXiv ID
- The frontend gracefully handles missing data files
