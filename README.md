# Research Papers Site

A Next.js website that automatically scrapes research papers from arXiv every morning via GitHub Actions and deploys to GitHub Pages.

## Categories

- **CS Research** — AI, Machine Learning, NLP, Computer Vision
- **Biology Research** — Genomics, Biophysics, Neuroscience
- **Electrochem Research** — Materials Science, Chemical Physics
- **Physics Research** — Quantum Physics, High Energy Theory, General Relativity

## Quick Start

### 1. Create a GitHub repo and push this code

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/research-papers-site.git
git push -u origin main
```

### 2. Enable GitHub Pages

1. Go to your repo's **Settings → Pages**
2. Set **Source** to **Deploy from a branch**
3. Set **Branch** to `gh-pages` / `/ (root)`
4. Save

### 3. Update `next.config.js` (if using a subpath)

If your site is at `username.github.io/research-papers-site`, uncomment the `basePath` line:

```js
basePath: '/research-papers-site',
```

### 4. Trigger the first run

Go to **Actions → Scrape Papers & Deploy → Run workflow** to trigger manually, or just push to `main`.

## Local Development

```bash
npm install
python scripts/scrape.py   # Fetch papers locally
npm run dev                 # Start dev server at localhost:3000
```

## Customizing Paper Sources

Edit `scripts/config.json` to:

- Change arXiv categories per research area
- Add specific labs/authors to prioritize
- Adjust the number of papers per category

### Adding a Lab/Author Filter

```json
{
  "cs": {
    "labs": [
      {
        "name": "MIT CSAIL",
        "authors": ["Yann LeCun", "Geoffrey Hinton"],
        "keywords": ["transformer", "attention"]
      }
    ]
  }
}
```

Papers matching these authors or keywords will be shown first.

## How It Works

1. **GitHub Actions** runs `scripts/scrape.py` at 8:00 AM UTC daily
2. The script queries the arXiv API and saves JSON to `data/`
3. The updated data is committed back to the repo
4. Next.js builds a static site reading from `data/*.json`
5. The `out/` directory is deployed to the `gh-pages` branch
