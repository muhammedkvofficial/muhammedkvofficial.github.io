// Renders /resume/ to muhammed-kv-resume.pdf with headless Chrome, so the file
// is the print stylesheet's own output rather than a second layout that has to
// be kept in step by hand.
//
//   node scripts/build-pdf.mjs            prints the live site
//   node scripts/build-pdf.mjs localhost  prints the dev server on :5190
//
// Run it whenever the resume content changes: the PDF is a snapshot and will
// otherwise drift from the page.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'muhammed-kv-resume.pdf');

const CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const chrome = CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) throw new Error('no Chrome or Edge found; install one or add its path to CANDIDATES');

const url = process.argv[2] === 'localhost'
  ? 'http://localhost:5190/resume/'
  : 'https://www.muhammedkv.com/resume/';

execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--no-pdf-header-footer',          // no browser URL/date furniture
  '--virtual-time-budget=12000',     // let the webfont load before printing
  `--print-to-pdf=${OUT}`,
  url,
], { stdio: 'pipe' });

const buf = fs.readFileSync(OUT);
const pages = (buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
console.log(`muhammed-kv-resume.pdf  ${pages} pages  ${(buf.length / 1024).toFixed(0)}kb  from ${url}`);
if (pages > 2) console.log('  note: over 2 pages, worth tightening the print rules');
