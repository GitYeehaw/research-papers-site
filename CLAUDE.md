# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Research Hub** — a Next.js 14 (App Router) static site deployed to GitHub Pages that auto-scrapes academic papers from the arXiv API daily across five categories: CS, Biology, Electrochemistry, Physics, and Robotics.

Live site: `https://gityeehaw.github.io/research-papers-site/`

## Tech Stack

- **Next.js 14** with App Router, TypeScript, Tailwind CSS, PostCSS
- **Static export** (`output: 'export'` in `next.config.js`) — no server, all pages prerendered at build time
- **`basePath: '/research-papers-site'`** — required for GitHub Pages subpath deployment
- **Python 3** scraper (`scripts/scrape.py`) using stdlib only; config in `scripts/config.json`

## Commands

```bash
npm run build      # Next.js static export → out/
npm run dev        # Local dev server

python scripts/scrape.py   # Manually fetch papers from arXiv → data/*.json
```

## Architecture

**Data flow:** arXiv API → `scripts/scrape.py` → `data/*.json` committed to `main` → Next.js build reads JSON at build time via `fs.readFileSync` → static HTML in `out/` → deployed to `gh-pages` branch → served by GitHub Pages.

Papers are embedded into static HTML at **build time** (not fetched client-side). `src/lib/data.ts` handles all data reading using Node.js `fs`; it falls back to empty results if a file is missing.

**Key files:**
- `src/lib/data.ts` — reads `data/*.json` at build time; single source of truth for data access
- `src/app/[category]/page.tsx` — one Server Component per category (`cs`, `physics`, `biology`, `electrochem`, `robotics`), each calls `getCategoryData()`
- `src/components/ResearchPage.tsx` — shared layout for all category pages
- `scripts/scrape.py` — arXiv scraper; categories controlled by `scripts/config.json`
- `.github/workflows/scrape-and-deploy.yml` — two jobs: `scrape` (runs scraper, commits data) then `build-and-deploy` (Next.js build + `peaceiris/actions-gh-pages` to `gh-pages` branch); triggered daily at 8 AM UTC and on every push to `main`
