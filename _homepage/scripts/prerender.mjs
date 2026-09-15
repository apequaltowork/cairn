// Writes the rendered homepage into dist/index.html's #root, after `vite build` (client)
// and `vite build --ssr src/entry-server.tsx --outDir dist-ssr` (server) have run.
// The browser then hydrates that markup instead of drawing the page from nothing.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HOMEPAGE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SSR = path.join(HOMEPAGE, 'dist-ssr');
const INDEX = path.join(HOMEPAGE, 'dist', 'index.html');
const ROOT = '<div id="root"></div>';

const { render } = await import(pathToFileURL(path.join(SSR, 'entry-server.js')).href);
const html = readFileSync(INDEX, 'utf8');
if (!html.includes(ROOT)) {
  console.error(`No empty ${ROOT} in dist/index.html; nothing prerendered.`);
  process.exit(1);
}
const markup = render();
writeFileSync(INDEX, html.replace(ROOT, `<div id="root">${markup}</div>`));
rmSync(SSR, { recursive: true, force: true });
console.log(`Prerendered the homepage into dist/index.html (${Math.round(markup.length / 1024)} KB of HTML).`);
