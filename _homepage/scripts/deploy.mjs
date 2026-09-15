// Copies the built homepage (dist/) into the website root, where GitHub Pages serves it.
// Run through `npm run deploy`, which builds first. The other pages
// (changelog, guide, privacy, support) are never touched.
import { cpSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HOMEPAGE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(HOMEPAGE, 'dist');
const SITE = path.resolve(HOMEPAGE, '..');

if (!existsSync(path.join(DIST, 'index.html'))) {
  console.error('No build in dist/. Use `npm run deploy`, which builds first.');
  process.exit(1);
}
// A safety check before anything is replaced: this must be the website repo's root.
if (!existsSync(path.join(SITE, 'changelog', 'index.html')) || !existsSync(path.join(SITE, '.git'))) {
  console.error(`${SITE} does not look like the website repo root; nothing copied.`);
  process.exit(1);
}

// Built files have hashed names, so clear the old ones instead of letting them pile up.
rmSync(path.join(SITE, 'assets'), { recursive: true, force: true });
cpSync(path.join(DIST, 'assets'), path.join(SITE, 'assets'), { recursive: true });
cpSync(path.join(DIST, 'images'), path.join(SITE, 'images'), { recursive: true });
cpSync(path.join(DIST, 'index.html'), path.join(SITE, 'index.html'));
cpSync(path.join(DIST, 'favicon.png'), path.join(SITE, 'favicon.png'));
console.log(`Homepage copied into ${SITE}. Check the site, then commit and push.`);
