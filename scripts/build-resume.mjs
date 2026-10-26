// Builds /resume/. Reuses the chrome from build-cases.mjs so the header and
// footer stay in step with the rest of the site. The page is written to print
// cleanly: Ctrl+P gives the PDF, so there is no separate file to keep in sync.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { header, botnav, footer } from './build-cases.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.muhammedkv.com';
const URL = `${SITE}/resume/`;

const TITLE = 'Resume: Digital Marketer & Web Developer in Calicut';
const DESC =
  'Resume of Muhammed KV, a digital marketer and web developer in Calicut, Kerala: selected work, services, experience and training.';

const WORK = [
  {
    name: 'Zedutoys',
    kind: 'E-commerce, branding, web',
    link: 'zedutoys.com',
    href: 'https://www.zedutoys.com',
    case: '/work/zedutoys/',
    body: 'Brand identity and store design for an educational toys retailer. Built a collections system (MindSprout, MakeSprout, ZingPlay) and age-based browsing, so parents shop by what a toy develops rather than by product type.',
  },
  {
    name: 'Royal Trading Academy',
    kind: 'Social media, graphic design',
    link: '@royalacademy_ae',
    href: 'https://www.instagram.com/royalacademy_ae/',
    case: '/work/royal-trading-academy/',
    body: 'Instagram design and day-to-day page handling for a UAE forex institute, across a 23.5K-follower audience. One visual system covering campaign creatives, the Trader of the Week series and Malayalam-language posts.',
  },
  {
    name: 'Nadan Camp',
    kind: 'Social media, Meta Ads, growth',
    link: '@nadancamp_',
    href: 'https://www.instagram.com/nadancamp_/',
    case: '/work/nadan-camp/',
    body: 'Started a Kerala travel community’s Instagram from zero and grew it past 2,000 followers. Run the page and the Meta reel campaigns behind it, with trip creatives carrying a direct booking call to action.',
  },
  {
    name: 'Seven live storefronts',
    kind: 'UI/UX, banner design, product design',
    link: null,
    href: null,
    case: null,
    body: 'Desert Essence and Joker Perfumes (UAE), ZEN (Saudi Arabia), DR.IN, COLE, Elegant Bayt and Sterling. UI/UX, banner design and product design on each.',
  },
  {
    name: 'Brand marks',
    kind: 'Logo design',
    link: null,
    href: null,
    case: null,
    body: 'Logomarks and wordmarks for Zedutoys, Elegant Bayt, Merkatyo, ZEN and sui menu.',
  },
];

const SERVICES = [
  'SEO', 'Meta Ads', 'Google Ads', 'Social media management',
  'Content and SEO copywriting', 'E-commerce development',
  'Branding and graphic design', 'Web development',
];

const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Resume', item: URL },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': URL + '#webpage',
      url: URL,
      name: TITLE,
      description: DESC,
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': `${SITE}/#person` },
      inLanguage: 'en-IN',
    },
  ],
};

const workRows = WORK.map((w) => `      <article class="cv-item">
        <div class="cv-item-head">
          <h3>${w.name}</h3>
          <span class="cv-kind">${w.kind}</span>
        </div>
        <p>${w.body}</p>${w.link ? `
        <p class="cv-links">
          <a href="${w.href}" target="_blank" rel="noopener">${w.link}</a>${w.case ? `
          <a class="cv-case" href="${w.case}">Case study</a>` : ''}
        </p>` : ''}
      </article>`).join('\n');

const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${TITLE} | Muhammed KV</title>
<meta name="description" content="${DESC}">
<link rel="canonical" href="${URL}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="Muhammed KV">

<meta name="theme-color" content="#F5F4EF" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#07080C" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/mkv-logo.png" type="image/png">

<meta property="og:site_name" content="Muhammed KV">
<meta property="og:title" content="${TITLE}">
<meta property="og:description" content="${DESC}">
<meta property="og:type" content="profile">
<meta property="og:url" content="${URL}">
<meta property="og:image" content="${SITE}/og-image.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap">
<link rel="stylesheet" href="/assets/style.css">
<script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
</script>
</head>
<body class="is-resume">

${botnav}

${header}

<main id="top">

  <section class="cv wrap">

    <header class="cv-head">
      <div>
        <h1>Muhammed KV</h1>
        <p class="cv-role">Digital Marketer &amp; Web Developer</p>
      </div>
      <ul class="cv-contact">
        <li><a href="${SITE}/">muhammedkv.com</a></li>
        <li><a href="mailto:muhammedkvofficial@gmail.com">muhammedkvofficial@gmail.com</a></li>
        <li><a href="tel:+919995609663">+91 99956 09663</a></li>
        <li><a href="https://www.linkedin.com/in/muhammedkv-marketing/" target="_blank" rel="noopener">linkedin.com/in/muhammedkv-marketing</a></li>
        <li><a href="https://github.com/muhammedkvofficial" target="_blank" rel="noopener">github.com/muhammedkvofficial</a></li>
        <li><a href="https://www.instagram.com/muhammedkv0" target="_blank" rel="noopener">instagram.com/muhammedkv0</a></li>
        <li>Calicut, Kerala, India</li>
      </ul>
    </header>

    <p class="cv-intro">I handle both halves of an online presence: the website that gets built, and the marketing that gets it found. Most businesses buy those separately and pay for it later, because a site built without search in mind is expensive to fix, and ads pointed at a slow page waste budget.</p>

    <p class="cv-actions">
      <a class="btn primary" href="/muhammed-kv-resume.pdf" download>Download PDF <span class="arw">↓</span></a>
      <a class="btn ghost" href="#" onclick="window.print();return false;">Print this page</a>
    </p>

    <section class="cv-block">
      <h2>Selected work</h2>
${workRows}
    </section>

    <section class="cv-block">
      <h2>What I do</h2>
      <ul class="cv-tags">
${SERVICES.map((s) => `        <li>${s}</li>`).join('\n')}
      </ul>
    </section>

    <section class="cv-block">
      <h2>Experience</h2>
      <article class="cv-item">
        <div class="cv-item-head">
          <h3>Hello Aura</h3>
          <span class="cv-kind">Present</span>
        </div>
        <p>Web design, graphic design, branding and digital marketing for client businesses, working with them to understand their goals and build solutions that strengthen their brand presence.</p>
      </article>
    </section>

    <section class="cv-block">
      <h2>Education and training</h2>
      <article class="cv-item">
        <div class="cv-item-head">
          <h3>B.Sc. Chemistry</h3>
          <span class="cv-kind">University of Calicut</span>
        </div>
        <p>The analytical half of the approach: campaigns treated as tests with measurable outcomes rather than guesses.</p>
      </article>
      <article class="cv-item">
        <div class="cv-item-head">
          <h3>Digital Marketing</h3>
          <span class="cv-kind">Fragmtree Campus, Calicut</span>
        </div>
        <p>SEO, paid search, paid social and analytics.</p>
      </article>
    </section>

    <p class="cv-foot-note">Full portfolio and case studies at <a href="${SITE}/">muhammedkv.com</a></p>

  </section>

</main>

${footer}

<script src="/assets/app.js" defer></script>
</body>
</html>
`;

const dir = path.join(ROOT, 'resume');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log('  resume/index.html written');
