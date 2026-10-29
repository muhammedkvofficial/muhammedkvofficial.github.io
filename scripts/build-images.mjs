// Generates an AVIF beside each content JPEG. The <picture> elements serve
// the AVIF where it is supported and fall back to the original JPEG elsewhere,
// so nothing is lost for older browsers.
//
//   node scripts/build-images.mjs          write any missing or stale AVIFs
//   node scripts/build-images.mjs --force  re-encode everything
//
// Qualities were chosen per file by searching for the lowest setting that
// still measures PSNR >= 40dB against the original, the usual threshold for
// "no visible difference". They are pinned here so builds are deterministic
// and fast; re-run the search if an image is replaced.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FORCE = process.argv.includes('--force');

const QUALITY = {
  'hero-emblem.jpg': 55,
  'zedutoys-home.jpg': 60,
  'royal-academy-grid.jpg': 60,
  'nadan-camp-grid.jpg': 65,
  'shop-desert-essence.jpg': 60,
  'shop-zen.jpg': 55,
  'shop-joker-perfumes.jpg': 60,
  'shop-dr-in.jpg': 60,
  'shop-cole.jpg': 60,
  'shop-elegant-bayt.jpg': 50,
  'shop-sterling.jpg': 60,
  'logo-zedutoys.jpg': 50,
  'logo-elegant-bayt.jpg': 50,
  'logo-merkatyo.jpg': 50,
  'logo-zen.jpg': 50,
  'logo-sui-menu.jpg': 50,
};
// og-image.jpg is deliberately absent: social scrapers want a plain JPEG.

let before = 0, after = 0, written = 0, skipped = 0;
for (const [file, quality] of Object.entries(QUALITY)) {
  const src = path.join(ROOT, file);
  if (!fs.existsSync(src)) { console.log('  missing, skipped: ' + file); continue; }
  const out = src.replace(/\.jpe?g$/i, '.avif');

  const srcStat = fs.statSync(src);
  before += srcStat.size;

  if (!FORCE && fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcStat.mtimeMs) {
    after += fs.statSync(out).size;
    skipped++;
    continue;
  }
  const buf = await sharp(src).avif({ quality, effort: 6 }).toBuffer();
  fs.writeFileSync(out, buf);
  after += buf.length;
  written++;
  console.log('  ' + path.basename(out).padEnd(26) +
              String(Math.round(srcStat.size / 1024)).padStart(4) + 'kb -> ' +
              String(Math.round(buf.length / 1024)).padStart(4) + 'kb  q' + quality);
}
console.log(`\n  ${written} written, ${skipped} already current`);
console.log('  jpeg ' + Math.round(before / 1024) + 'kb -> avif ' + Math.round(after / 1024) +
            'kb  (-' + Math.round((1 - after / before) * 100) + '%)');
