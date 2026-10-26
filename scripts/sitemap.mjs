// Regenerates sitemap.xml. Each URL carries a lastmod taken from the day its
// own source file last changed, read from git. Deliberately not "today": a
// sitemap that claims today on every deploy is one Google learns to ignore.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.muhammedkv.com';

// Case study pages are generated, so their content really lives in the builder
// and its data. Date them from whichever of the two changed most recently.
const CASE_SLUGS = ['zedutoys', 'royal-trading-academy', 'nadan-camp'];
const PAGES = [
  { loc: `${SITE}/`, sources: ['index.html'] },
  { loc: `${SITE}/resume/`, sources: ['resume/index.html', 'scripts/build-resume.mjs'] },
  ...CASE_SLUGS.map((s) => ({
    loc: `${SITE}/work/${s}/`,
    sources: [`work/${s}/index.html`, 'scripts/build-cases.mjs'],
  })),
];

function lastChanged(files) {
  const dates = [];
  for (const f of files) {
    try {
      const iso = execSync(`git log -1 --format=%cI -- ${f}`, { cwd: ROOT, encoding: 'utf8' }).trim();
      if (iso) dates.push(iso.slice(0, 10));
    } catch { /* no git, or no history for this file */ }
  }
  if (dates.length) return dates.sort().pop();
  // fall back to the newest mtime rather than inventing a date
  const mtimes = files
    .map((f) => path.join(ROOT, f))
    .filter((p) => fs.existsSync(p))
    .map((p) => fs.statSync(p).mtime.getTime());
  return new Date(mtimes.length ? Math.max(...mtimes) : Date.now()).toISOString().slice(0, 10);
}

// changefreq and priority are omitted on purpose: Google ignores both.
const body = PAGES.map((p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${lastChanged(p.sources)}</lastmod>
  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const out = path.join(ROOT, 'sitemap.xml');
const before = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : '';
if (before === xml) {
  console.log(`sitemap.xml already current (${PAGES.length} urls)`);
} else {
  fs.writeFileSync(out, xml);
  console.log(`sitemap.xml written (${PAGES.length} urls)`);
}
