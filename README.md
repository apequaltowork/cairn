# Cairn website

The site at https://apequaltowork.github.io/cairn/, published by GitHub Pages
from the root of `main`.

| Path | What |
|---|---|
| `index.html`, `assets/`, `images/`, `favicon.png` | The homepage, **built** from `_homepage/`. Don't edit these by hand |
| `changelog/`, `guide/`, `privacy/`, `support/` | Hand-written pages, edited directly |
| `_homepage/` | The homepage's source (React, Vite, Tailwind). GitHub Pages skips folders whose names start with `_`, so it is not published |

To change the homepage, edit `_homepage/`, then from that folder run
`npm install` (first time only) and `npm run deploy`. Check the site, commit and
push. Details are in `_homepage/README.md`.
