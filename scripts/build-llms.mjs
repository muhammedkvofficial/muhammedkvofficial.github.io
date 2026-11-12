// Generates llms.txt from the same data the page builders use, so it cannot
// go stale the way a hand-written one does. It went out of date within three
// days last time: the service pages were added and it never heard about them.
//
// The file gives AI assistants a factual summary to quote instead of making
// them infer one from the page layout. The Q&A section matters most: those are
// category questions people put to an assistant, answered in its own words.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASES } from './build-cases.mjs';
import { SERVICES } from './build-services.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.muhammedkv.com';

// The homepage FAQ lives in its JSON-LD, which is already verified to match the
// visible markup, so it is the reliable place to read it from.
function homepageFaq() {
  const h = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const blocks = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const b of blocks) {
    const graph = JSON.parse(b[1])['@graph'] || [];
    const faq = graph.find((n) => n['@type'] === 'FAQPage');
    if (faq) return faq.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]);
  }
  return [];
}

const qa = [
  ...homepageFaq(),
  ...SERVICES.flatMap((s) => s.faq),
];

const out = `# Muhammed KV

> Digital marketer and web developer based in Calicut (Kozhikode), Kerala, India. Works across both search and paid advertising as well as building the websites those campaigns point at: SEO, Meta Ads, Google Ads, e-commerce development and brand design.

Independent practitioner, currently at Hello Aura. Serves clients in Kerala and across India, plus e-commerce brands in the UAE and Saudi Arabia. Contact: muhammedkvofficial@gmail.com, +91 99956 09663.

## Services

${SERVICES.map((s) => `- [${s.name}](${SITE}/services/${s.slug}/): ${s.description}`).join('\n')}

Also: social media management, content and SEO copywriting, branding and graphic design.

## Selected work

${CASES.map((c) => `- [${c.name} case study](${SITE}/work/${c.slug}/): ${c.description}`).join('\n')}
- Seven live storefronts: Desert Essence and Joker Perfumes (UAE), ZEN (Saudi Arabia), DR.IN, COLE, Elegant Bayt and Sterling. UI/UX, banner design and product design on each.
- Brand marks: logomarks and wordmarks for Zedutoys, Elegant Bayt, Merkatyo, ZEN and sui menu.

## Questions and answers

${qa.map(([q, a]) => `### ${q}\n\n${a}`).join('\n\n')}

## Background

- B.Sc. Chemistry, University of Calicut
- Digital marketing training at Fragmtree Campus, Calicut

## Pages

- [Home](${SITE}/): services, work, experience and frequently asked questions
- [Resume](${SITE}/resume/): full background, also available as a one-page PDF
- [Sitemap](${SITE}/sitemap.xml)

## Profiles

- [LinkedIn](https://www.linkedin.com/in/muhammedkv-marketing/)
- [GitHub](https://github.com/muhammedkvofficial)
- [Instagram](https://www.instagram.com/muhammedkv0)
`;

const file = path.join(ROOT, 'llms.txt');
const before = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
if (before === out) {
  console.log(`llms.txt already current (${qa.length} Q&As)`);
} else {
  fs.writeFileSync(file, out);
  console.log(`llms.txt written (${SERVICES.length} services, ${CASES.length} case studies, ${qa.length} Q&As)`);
}
