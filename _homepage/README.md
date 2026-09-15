# Cairn homepage

Source of the homepage at https://apequaltowork.github.io/cairn/, built on the
Google AI Studio prototype in `social-assets/website/design-prototypes/cairn-app-2`
(outside this repo), with its placeholder copy replaced by what Cairn actually does.

```bash
npm install
npm run dev      # http://localhost:3006
npm run lint     # type check
npm run deploy   # build, then copy the result into the website root
```

In development, What's New, Privacy, Support and the Guide are served from the
website folder one level up, so every link on the page opens the real page.

## Deploying

`npm run deploy` builds into `dist/`, writes the rendered page into its HTML
(`scripts/prerender.mjs`, so search engines and link previews see the real
text), and copies `index.html`, `assets/`,
`images/` and `favicon.png` into the website root, removing the old `assets/`
first so stale hashed files don't pile up. The other pages are left alone. Then
check the site, commit and push; GitHub Pages publishes in a minute or two.

The build uses relative paths, so it works at a domain root or under `/cairn/`.
This folder's name starts with `_`, which GitHub Pages skips, so the source is
never published as part of the site. Don't add a `.nojekyll` file to the repo.

Fonts are bundled from npm (`@fontsource`), so the page makes no requests to
Google Fonts. The only third-party request is the YouTube player, and only
after someone presses Watch.

## Keep in step with the extension

- **The panel shown is the 1.4.0 redesign** (Overview, Workspaces, Tabs,
  Cleanup): the demo, the crash card, and the `public/images/panel-*.webp`
  screenshots, which are real captures with sample data. When the panel changes,
  re-capture them with `social-assets/website/tools/capture-panel.mjs`.
- **Shortcuts:** Ctrl/⌘+Shift+Space opens Cairn; Ctrl/⌘+Shift+K opens the
  command palette. There is no save shortcut.
- **Crash recovery numbers** (snapshot every minute, last 5 kept, a week) come
  from `src/tabs/snapshotService.ts` and `src/background/index.ts` in `cairn-code`.
- **Search and link previews:** `index.html` holds the title, description,
  canonical URL, preview image (`public/images/og-image.png`, 1200×630) and
  structured data, all with the full `https://apequaltowork.github.io/cairn/`
  address. Change them together if the site moves to its own domain, and
  update the dates in `../sitemap.xml` when pages change.
- **No paid features** on this page.
