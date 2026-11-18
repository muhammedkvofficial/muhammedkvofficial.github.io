// Builds the print source for the CV PDF.
//
// This is NOT a published page. It writes into scripts/, which .vercelignore
// excludes, so it never deploys; the only public artefact is the PDF at
// /muhammed-kv-cv.pdf. The browsable version of this material is /resume/.
//
//   node scripts/build-cv.mjs            write the print source
//   node scripts/print-cv.mjs            render it to muhammed-kv-cv.pdf
//
// Set in the LaTeX manner: Computer Modern, small-caps name, ruled section
// headings, dates right-aligned.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const icon = {
  phone: '<path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/>',
  mail: '<path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>',
  linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95 4 0 4.4 2.5 4.4 5.8V21h-4v-5.6c0-1.35-.03-3.1-1.9-3.1-1.9 0-2.2 1.45-2.2 2.99V21h-4V9z"/>',
  github: '<path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>',
  globe: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-2.95a15.6 15.6 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.9 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14a7.9 7.9 0 0 1 0-4h3.38a16.6 16.6 0 0 0 0 4H4.26zm.84 2h2.95c.32 1.25.79 2.45 1.38 3.56A7.99 7.99 0 0 1 5.1 16zm2.95-8H5.1a7.99 7.99 0 0 1 4.33-3.56A15.6 15.6 0 0 0 8.05 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82A13.7 13.7 0 0 1 12 19.96zM14.34 14H9.66a14.9 14.9 0 0 1 0-4h4.68a14.9 14.9 0 0 1 0 4zm.23 5.56c.59-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14a16.6 16.6 0 0 0 0-4h3.38a7.9 7.9 0 0 1 0 4h-3.38z"/>',
};
const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${icon[k]}</svg>`;

const EDUCATION = [
  ['Fragmentree Digital Campus', 'Dec 2025 &ndash; Apr 2026', 'Digital Marketing', 'Calicut, Kerala'],
  ['Tamil Nadu Teachers Education University', '2023', 'Bachelor of Education (B.Ed)', 'Tamil Nadu'],
  ['University of Calicut', '2019', 'Bachelor of Science (B.Sc) in Chemistry', 'Calicut, Kerala'],
];

const ACHIEVEMENTS = [
  'Built a travel community&rsquo;s Instagram from an empty account to past <b>2,000 followers</b>, running the content and the Meta reel campaigns behind it.',
  'Handle Instagram design and day-to-day publishing for a UAE forex institute across a <b>23.5K-follower</b> audience, under one visual system.',
  'Delivered UI/UX, banner design and product design for <b>seven live e-commerce storefronts</b> across the UAE, Saudi Arabia and India.',
  'Designed <b>five brand identities</b>, from monogram to full wordmark, for retail and e-commerce clients.',
  'Built and designed a complete educational-toys e-commerce store, including an age-based collections system so parents shop by what a toy develops rather than by product type.',
];

const EXPERIENCE = [
  ['Hello Aura', '2026 &ndash; Present', 'Digital Marketer &amp; Web Developer', 'Calicut, Kerala', [
    'Deliver web design, graphic design, branding and digital marketing for client businesses, working with them to define the goal before proposing the route to it.',
    'Run SEO engagements end to end: technical audits, keyword and intent research, on-page work, local search and content.',
    'Plan and manage Meta and Google Ads campaigns, with conversion tracking configured and tested before any budget goes live.',
    'Build responsive, search-ready websites and e-commerce stores on clean semantic structure, with analytics in place at launch.',
  ]],
  ['Nadan Camp', 'Freelance', 'Social Media, Meta Ads &amp; Growth', 'Kerala, India', [
    'Started the account from zero: set up the page, its identity and voice, and established a posting rhythm from an empty start.',
    'Lead with reels from real trips, and put paid promotion behind the ones that earn it organically rather than boosting evenly.',
    'Design trip-specific campaign creatives carrying dates and a direct booking call to action.',
  ]],
  ['Royal Trading Academy', 'Freelance', 'Social Media &amp; Graphic Design', 'United Arab Emirates', [
    'Built one visual system across every post, so the grid reads as a single brand rather than a stream of individual pieces.',
    'Produce recurring formats, including the Trader of the Week student series and course campaign creatives.',
    'Design English and Malayalam posts within the same system, for a Malayali audience and technical subject matter.',
  ]],
  ['Zedutoys and client storefronts', 'Freelance', 'E-commerce, UI/UX &amp; Brand Design', 'India, UAE &amp; Saudi Arabia', [
    'Brand identity and store design for Zedutoys, an educational toys retailer, built around a collections system and age-based browsing.',
    'UI/UX, banner design and product design for Desert Essence, Joker Perfumes, ZEN, DR.IN, COLE, Elegant Bayt and Sterling.',
    'Logomarks and wordmarks for Zedutoys, Elegant Bayt, Merkatyo, ZEN and sui menu.',
  ]],
];

const entry = (l, r, li, ri, bullets) => `  <div class="entry">
    <div class="row"><span class="l">${l}</span><span class="r">${r}</span></div>
    <div class="row tight"><span class="li">${li}</span><span class="ri">${ri}</span></div>${bullets ? `
    <ul>
${bullets.map((b) => `      <li>${b}</li>`).join('\n')}
    </ul>` : ''}
  </div>`;

const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<title>Muhammed KV &mdash; Curriculum Vitae</title>

<!-- Computer Modern, the typeface the LaTeX look comes from. Cambria and
     Georgia are local fallbacks if the webfont does not load. -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dreampulse/computer-modern-web-font@master/fonts.css">

<style>
  *{box-sizing:border-box}
  html{background:#9aa0a6}

  body{
    font-family:"Computer Modern Serif","CMU Serif","Latin Modern Roman",Cambria,Georgia,"Times New Roman",serif;
    font-size:10.2pt;
    line-height:1.33;
    color:#000;
    background:#fff;
    width:210mm;
    margin:0 auto;
    padding:14mm 17mm 13mm;
    /* Computer Modern ligates ffi, and the PDF then stores one glyph: the
       email extracted as muhammedkvo<ffi>cial@gmail.com, a broken address for
       anything parsing the file. A CV exists to be read and replied to. */
    font-variant-ligatures:none;
    font-feature-settings:"liga" 0,"clig" 0,"dlig" 0;
  }

  .name{
    text-align:center;font-size:25pt;font-variant:small-caps;
    letter-spacing:.055em;font-weight:400;margin:0 0 5pt;line-height:1.1;
  }
  .contact{text-align:center;font-size:8.6pt;line-height:1.7;margin:0 0 11pt}
  .contact a{color:#1a3a6b;text-decoration:underline;text-underline-offset:1.5pt}
  .contact .item{white-space:nowrap;margin:0 7pt}
  .contact svg{width:8.4pt;height:8.4pt;vertical-align:-.9pt;margin-right:2.6pt;fill:currentColor}

  h2{
    font-size:11.6pt;font-weight:700;margin:11pt 0 0;padding:0 0 1.5pt;
    border-bottom:.9pt solid #000;
  }
  h2:first-of-type{margin-top:3pt}

  .summary{text-align:justify;hyphens:auto;margin:5pt 0 0}

  .row{display:flex;justify-content:space-between;align-items:baseline;gap:12pt;margin-top:6pt}
  .row.tight{margin-top:2.5pt}
  .row .l{font-weight:700}
  .row .r{font-weight:700;white-space:nowrap}
  .row .li{font-style:italic}
  .row .ri{font-style:italic;white-space:nowrap;text-align:right}

  .entry{margin-top:7pt}
  .entry:first-of-type{margin-top:5pt}

  ul{margin:3pt 0 0;padding-left:15pt}
  li{margin:1.2pt 0;padding-left:1pt}

  .skills{margin:5pt 0 0}

  @media print{
    html{background:#fff}
    body{width:auto;margin:0;padding:0}
    @page{margin:14mm 17mm 13mm}
    h2{break-after:avoid;page-break-after:avoid}
    .entry{break-inside:avoid;page-break-inside:avoid}
  }
</style>
</head>
<body>

<h1 class="name">Muhammed KV</h1>

<p class="contact">
  <span class="item">${svg('phone')}+91 99956 09663</span>
  <span class="item">${svg('mail')}<a href="mailto:muhammedkvofficial@gmail.com">muhammedkvofficial@gmail.com</a></span>
  <br>
  <span class="item">${svg('linkedin')}<a href="https://www.linkedin.com/in/muhammedkv-marketing/">/muhammedkv-marketing</a></span>
  <span class="item">${svg('github')}<a href="https://github.com/muhammedkvofficial">/muhammedkvofficial</a></span>
  <span class="item">${svg('globe')}<a href="https://www.muhammedkv.com">muhammedkv.com</a></span>
</p>

<h2>Career summary</h2>
<p class="summary">Digital marketer and web developer based in Calicut (Kozhikode), Kerala, working across both halves of an online presence: the website that gets built, and the marketing that gets it found. Most businesses buy those separately and pay for it later, because a site built without search in mind is expensive to fix, and ads pointed at a slow page waste budget. Current work spans search engine optimisation, Meta and Google Ads, e-commerce development and brand design, for clients in Kerala and across India as well as e-commerce brands in the UAE and Saudi Arabia. Campaigns are set up with conversion tracking before any budget runs, so reporting is tied to what the spend returned rather than to reach.</p>

<h2>Education</h2>
${EDUCATION.map(([l, r, li, ri]) => entry(l, r, li, ri, null)).join('\n')}

<h2>Achievements</h2>
<ul>
${ACHIEVEMENTS.map((a) => `  <li>${a}</li>`).join('\n')}
</ul>

<h2>Experience</h2>
${EXPERIENCE.map(([l, r, li, ri, b]) => entry(l, r, li, ri, b)).join('\n')}

<h2>Skills</h2>
<p class="skills">
  <b>Marketing:</b> Search engine optimisation, local SEO, Meta Ads, Google Ads, social media management, content and SEO copywriting, conversion tracking and analytics.<br>
  <b>Development:</b> HTML, CSS, JavaScript, React, Vite, Shopify, e-commerce development, responsive and mobile-first builds, structured data.<br>
  <b>Design:</b> Brand identity, logomarks and wordmarks, campaign and social creative, banner and product design, UI/UX.<br>
  <b>Languages:</b> English, Malayalam.
</p>

</body>
</html>
`;

const dir = path.join(ROOT, 'scripts', 'cv-source');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.html'), html);
console.log('  scripts/cv-source/index.html written (print source, not deployed)');
