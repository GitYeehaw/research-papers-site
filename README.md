# Research Hub

A static site that scrapes academic papers from arXiv every morning and deploys to GitHub Pages. Papers are embedded into static HTML at build time — no client-side fetching, no backend.

**Live site:** [gityeehaw.github.io/research-papers-site](https://gityeehaw.github.io/research-papers-site)

## Categories

| Category | Topics |
|----------|--------|
| **CS** | AI, Machine Learning, NLP, Computer Vision |
| **Biology** | Genomics, Biophysics, Neuroscience |
| **Electrochemistry** | Materials Science, Chemical Physics |
| **Physics** | Quantum Physics, High Energy Theory, General Relativity |
| **Robotics** | Motion Planning, Control, Robot Learning |

## How It Works

1. GitHub Actions runs `scripts/scrape.py` at 8:00 AM UTC daily
2. The scraper queries the arXiv API and saves results to `data/*.json`
3. Updated JSON is committed back to `main`
4. Next.js reads the JSON at build time and generates static HTML
5. The `out/` directory is deployed to the `gh-pages` branch

## Tech Stack

- **Next.js 14** (App Router, static export)
- **TypeScript + Tailwind CSS**
- **Python 3** scraper (stdlib only)
- **GitHub Actions** for daily scraping and deployment

## Local Development

```bash
npm install
python scripts/scrape.py   # Fetch papers from arXiv
npm run dev                 # Dev server at localhost:3000
npm run build              # Static export → out/
```

## Configuration

Edit `scripts/config.json` to change arXiv categories, adjust paper counts, or prioritize specific authors and keywords.

```json
{
  "cs": {
    "categories": ["cs.AI", "cs.LG"],
    "max_results": 50,
    "labs": [
      {
        "name": "Example Lab",
        "authors": ["Author Name"],
        "keywords": ["diffusion", "transformer"]
      }
    ]
  }
}
```

## Deployment (GitHub Pages)

1. Fork or clone this repo and push to GitHub
2. Go to **Settings → Pages**, set source to `gh-pages` branch, root
3. In `next.config.js`, set `basePath` to match your repo name
4. Go to **Actions → Scrape Papers & Deploy → Run workflow** to trigger the first build
