import fs from 'node:fs';
import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

// What's New, Privacy, Support and the Guide stay as their own static pages in
// the website folder one level up. In development they are served from there, so
// the links on this page open the real pages instead of falling through to the homepage.
const WEBSITE = path.resolve(__dirname, '..');
const SUBPAGES = ['changelog', 'privacy', 'support', 'guide'];

function websiteSubpages(): Plugin {
  return {
    name: 'cairn-website-subpages',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '').split('?')[0];
        const page = SUBPAGES.find((p) => url === `/${p}` || url === `/${p}/` || url === `/${p}/index.html`);
        if (!page) return next();
        // The pages link with "../", which only resolves from the trailing-slash URL.
        if (url === `/${page}`) {
          res.statusCode = 301;
          res.setHeader('Location', `/${page}/`);
          res.end();
          return;
        }
        const file = path.join(WEBSITE, page, 'index.html');
        if (!fs.existsSync(file)) return next();
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(fs.readFileSync(file));
      });
    },
  };
}

export default defineConfig({
  // Relative, so the build works wherever it's hosted: a domain root, or /cairn/ on GitHub Pages.
  base: './',
  plugins: [react(), tailwindcss(), websiteSubpages()],
});
