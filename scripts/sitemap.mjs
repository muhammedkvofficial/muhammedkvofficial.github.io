// Regenerates sitemap.xml with a lastmod taken from the day index.html actually
// last changed, read from git. Deliberately not "today": a sitemap that claims
// today on every deploy is one Google learns to ignore.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.muhammedkv.com/';
const PAGE = 'index.html';

let lastmod;
try {
  const iso = execSync(`git log -1 --format=%cI -- ${PAGE}`, { cwd: ROOT, encoding: 'utf8' }).trim();
  if (iso) lastmod = iso.slice(0, 10);
} catch { /* not a git checkout, or no history for the file */ }

// fall back to the file's own mtime rather than inventing a date
if (!lastmod) {
  lastmod = new Date(fs.statSync(path.join(ROOT, PAGE)).mtime).toISOString().slice(0, 10);
}

// changefreq and priority are omitted on purpose: Google ignores both.
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`;

const out = path.join(ROOT, 'sitemap.xml');
const before = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
if (before === xml) {
  console.log(`sitemap.xml already current (lastmod ${lastmod})`);
} else {
  fs.writeFileSync(out, xml);
  console.log(`sitemap.xml written (lastmod ${lastmod})`);
}
