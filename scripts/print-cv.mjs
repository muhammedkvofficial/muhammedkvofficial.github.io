// Renders the CV print source to muhammed-kv-cv.pdf with headless Chrome.
// The PDF is the only public artefact; its source lives under scripts/, which
// .vercelignore excludes.
//
//   node scripts/build-cv.mjs && node scripts/print-cv.mjs
//
// Needs the dev server running, since Chrome has to fetch the webfont and a
// file:// page cannot. Run it again whenever the CV content changes: the PDF
// is a snapshot and will otherwise drift from its source.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'muhammed-kv-cv.pdf');
const URL = process.argv[2] || 'http://localhost:5190/scripts/cv-source/index.html';

const CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const chrome = CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) throw new Error('no Chrome or Edge found; add its path to CANDIDATES');

execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--no-pdf-header-footer',
  '--virtual-time-budget=20000',   // Computer Modern needs time to arrive
  `--print-to-pdf=${OUT}`,
  URL,
], { stdio: 'pipe' });

const buf = fs.readFileSync(OUT);
const pages = (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
console.log(`muhammed-kv-cv.pdf  ${pages} page(s)  ${(buf.length / 1024).toFixed(0)}kb  from ${URL}`);
