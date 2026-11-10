// Builds the service pages. The homepage tries to rank for SEO, ads, web
// development and branding at once, which means it competes properly for none
// of them. Each page here owns one keyword cluster and one buying intent.
//
// Reuses the chrome and the case-page CSS classes from build-cases.mjs, so
// there is no new stylesheet to keep in step.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CASES, header, botnav, footer, contact } from './build-cases.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.muhammedkv.com';

const SERVICES = [
  {
    slug: 'seo-calicut',
    name: 'SEO Services in Calicut',
    kicker: 'Search Engine Optimisation',
    title: 'SEO Services in Calicut, Kerala',
    description:
      'SEO for businesses in Calicut and across Kerala: technical audits, on-page work, local search and content built around what customers actually search.',
    lede: 'Getting found by people already looking for what you sell, without paying for every click.',
    serviceType: 'Search Engine Optimisation',
    brief: [
      'Most sites in Kerala are not losing search traffic to competitors with bigger budgets. They are losing it to basic structural problems: pages with no title worth clicking, content written for the business rather than the customer, and a site that loads slowly on the mobile connection most people are actually using.',
      'SEO fixes those before it touches anything clever. The order matters, because content built on a broken structure does not rank no matter how good it is.',
    ],
    did: [
      ['Technical audit', 'Crawlability, indexation, page speed, mobile rendering, duplicate content and structured data. The things that quietly cap every other effort.'],
      ['Keyword and intent research', 'What your customers type, and what they expect to find when they type it. A page that ranks for the wrong intent earns nothing.'],
      ['On-page work', 'Titles, meta descriptions, heading structure, internal linking and schema markup, done page by page rather than site-wide and generic.'],
      ['Local search', 'Google Business Profile, consistent name, address and phone across directories, and location signals that tie your business to Calicut and Kerala.'],
      ['Content', 'Pages that answer the questions people ask before they buy. These rank, and they also get quoted by AI assistants, which increasingly sit between a search and a decision.'],
      ['Measurement', 'Search Console and Analytics configured before the work starts, so the before and after are both real numbers rather than impressions.'],
    ],
    outcome:
      'SEO is slow and compounding. The technical and on-page work shows in weeks; content and authority take months. Anyone promising first position on a timeline is selling you something else.',
    faq: [
      ['How long does SEO take to show results?',
       'Technical and on-page fixes can show within four to eight weeks. Content and authority building take three to six months before the trend is clear. Anyone quoting faster than that is either targeting keywords nobody searches or not telling you the whole picture.'],
      ['Do you work with businesses outside Calicut?',
       'Yes. I am based in Calicut (Kozhikode) and work with businesses across Kerala and the rest of India, plus e-commerce brands in the UAE and Saudi Arabia. Audits, reporting and review calls all happen online, so location is not a constraint.'],
      ['Can you guarantee a number one ranking?',
       'No, and neither can anyone else honestly. Google weighs hundreds of signals and nobody controls them. What I can commit to is the work being measurable: tracking set up first, so you can see what changed and judge it yourself.'],
      ['Is SEO worth it if I am already running ads?',
       'Usually yes, because they do different jobs. Ads stop the moment you stop paying; search traffic keeps arriving. Running both also tells you which keywords convert before you commit to ranking for them.'],
    ],
    cases: ['zedutoys'],
  },
  {
    slug: 'web-development-calicut',
    name: 'Web Development in Calicut',
    kicker: 'Websites and E-commerce',
    title: 'Web Developer in Calicut: Websites & E-commerce',
    description:
      'Websites and e-commerce stores built in Calicut, Kerala: fast, mobile-first and structured for search from the first line rather than retrofitted later.',
    lede: 'Sites built to be found, not just to look right in a design file.',
    serviceType: 'Web Development',
    brief: [
      'A website that was never built with search in mind is expensive to fix afterwards. The structure decisions that matter for ranking are made early, and reversing them later usually means rebuilding rather than editing.',
      'Building both halves means those decisions get made once, correctly: the markup, the speed, the URL structure and the content model all account for how the site will be found, not only how it will look.',
    ],
    did: [
      ['Business and landing sites', 'Fast, mobile-first pages that load on a patchy connection and say what the business does above the fold.'],
      ['E-commerce stores', 'Catalogue structure, collections, product pages and checkout, built so categories can actually rank rather than hiding behind filters.'],
      ['Search-ready structure', 'Semantic markup, clean URLs, structured data and sensible internal linking from the start, not bolted on after launch.'],
      ['Performance', 'Modern image formats, lazy loading below the fold, and explicit dimensions so the layout does not jump while loading.'],
      ['Accessibility and mobile', 'Real tap targets, readable contrast and layouts tested at phone width, since that is where most of the traffic is.'],
      ['Analytics from day one', 'Tracking and conversion events configured at launch, so the site is measurable the day it goes live.'],
    ],
    outcome:
      'The site ships ready to be marketed: indexable, quick, and structured so that SEO and ad campaigns have something solid to point at.',
    faq: [
      ['How long does a website take to build?',
       'It depends on scope. A focused landing page is quick; an e-commerce store with a catalogue, payments and content takes longer. I will give you a realistic timeline once we have talked through what the site actually needs to do.'],
      ['Do you build on Shopify or custom?',
       'Both. Shopify makes sense when you want to run the store yourself without a developer in the loop. Custom makes sense when the catalogue or the checkout does something Shopify fights you on. I will tell you which fits rather than defaulting to whichever is easier for me.'],
      ['Will the site work properly on phones?',
       'Yes, and that is where it gets designed first. Most traffic in Kerala arrives on a phone, often on a slow connection, so layouts are tested at phone width and images are served in modern formats to keep pages light.'],
      ['Can you redesign a site I already have?',
       'Yes. That usually starts with an audit, because it is worth knowing which pages currently earn traffic before anything is changed. Redesigns that ignore that are the most common way a business loses rankings overnight.'],
    ],
    cases: ['zedutoys'],
  },
  {
    slug: 'google-meta-ads-calicut',
    name: 'Google Ads & Meta Ads in Calicut',
    kicker: 'Paid Advertising',
    title: 'Google Ads & Meta Ads Management in Calicut',
    description:
      'Meta and Google Ads managed for businesses in Calicut and Kerala: conversion tracking set up first, then campaigns judged on returns rather than reach.',
    lede: 'Campaigns measured against what they earned, not what they reached.',
    serviceType: 'Paid Advertising',
    brief: [
      'Most underperforming ad accounts are not badly targeted. They are badly measured. Without conversion tracking configured properly, the platform optimises towards clicks and impressions, because those are the only signals it has been given.',
      'So tracking comes before spending. Once the account can tell a purchase from a page view, the optimisation has something real to aim at, and so do the reports you get.',
    ],
    did: [
      ['Tracking first', 'Conversion events, pixel and server-side signals configured and tested before any budget goes live. Reach and impressions are not outcomes.'],
      ['Meta Ads', 'Campaign structure, audiences and creative for Instagram and Facebook, with the creative built rather than borrowed from a stock library.'],
      ['Google Ads', 'Search and shopping campaigns, keyword and negative keyword management, and landing pages that match the promise in the ad.'],
      ['Creative that belongs to the brand', 'Ad creative designed in the same visual system as the rest of your presence, so a paid impression still reinforces the brand.'],
      ['Ongoing management', 'Budget shifted towards what converts and away from what does not, as a continuing job rather than a monthly screenshot.'],
      ['Reporting on returns', 'Reports tied to conversions, cost per acquisition and revenue where the data allows it, not to vanity numbers.'],
    ],
    outcome:
      'The account becomes legible: you can see which campaigns pay for themselves and which do not, and the budget follows that rather than a hunch.',
    faq: [
      ['What budget do I need to start?',
       'Enough for the platform to leave the learning phase, which depends on your product and how often people buy it. A thin budget spread over many campaigns learns nothing and spends anyway, so it is usually better to start narrow.'],
      ['Meta Ads or Google Ads: which should I run?',
       'Google captures people already searching for what you sell, so it suits established demand. Meta creates demand among people who were not looking yet, so it suits new products and visual categories. Which fits depends on whether people already know they want this.'],
      ['How do you measure whether ads worked?',
       'Tracking gets set up before a campaign runs: conversions, form fills, purchases, whichever action actually matters to the business. Reporting is tied to those numbers rather than reach or impressions alone, so you can see what the spend returned.'],
      ['Do you design the ad creative as well?',
       'Yes. Creative and campaign management are the same job here, which is how the creative ends up matching the brand rather than looking like it came from somewhere else.'],
    ],
    cases: ['royal-trading-academy', 'nadan-camp'],
  },
];

function page(s) {
  const url = `${SITE}/services/${s.slug}/`;
  const related = CASES.filter((c) => s.cases.includes(c.slug));
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/#services` },
          { '@type': 'ListItem', position: 3, name: s.name, item: url },
        ],
      },
      {
        '@type': 'Service',
        '@id': url + '#service',
        name: s.name,
        serviceType: s.serviceType,
        description: s.description,
        url,
        provider: { '@id': `${SITE}/#person` },
        areaServed: [
          { '@type': 'City', name: 'Calicut' },
          { '@type': 'City', name: 'Kozhikode' },
          { '@type': 'State', name: 'Kerala' },
          { '@type': 'Country', name: 'India' },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: s.name,
          itemListElement: s.did.map(([h]) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: h },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': url + '#faq',
        mainEntity: s.faq.map(([q, a]) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
      {
        '@type': 'WebPage',
        '@id': url + '#webpage',
        url,
        name: s.title,
        description: s.description,
        isPartOf: { '@id': `${SITE}/#website` },
        about: { '@id': url + '#service' },
        inLanguage: 'en-IN',
      },
    ],
  };

  const steps = s.did
    .map(([h, b]) => `        <div class="case-step">\n          <h3>${h}</h3>\n          <p>${b}</p>\n        </div>`)
    .join('\n');

  // The FAQ markup and the FAQPage schema are generated from one array, so the
  // two cannot drift out of step.
  const faq = s.faq
    .map(([q, a], i) => `      <details class="faq-item"${i === 0 ? ' open' : ''}>
        <summary><h3>${q}</h3><span class="faq-mark" aria-hidden="true"></span></summary>
        <div class="faq-a"><p>${a}</p></div>
      </details>`)
    .join('\n');

  const relatedBlock = related.length
    ? `
  <section class="wrap case-next">
    <span class="idx">Related work</span>
    <div class="case-next-grid">
${related.map((c) => `      <a class="case-next-card reveal" href="/work/${c.slug}/">
        <span class="k">${c.kicker}</span>
        <h3>${c.name}</h3>
        <p>${c.lede}</p>
        <span class="case-next-go">Read the case study <span aria-hidden="true">↗</span></span>
      </a>`).join('\n')}
${others.map((o) => `      <a class="case-next-card reveal" href="/services/${o.slug}/">
        <span class="k">${o.kicker}</span>
        <h3>${o.name}</h3>
        <p>${o.lede}</p>
        <span class="case-next-go">See the service <span aria-hidden="true">↗</span></span>
      </a>`).join('\n')}
    </div>
  </section>`
    : '';

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${s.title} | Muhammed KV</title>
<meta name="description" content="${s.description}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="author" content="Muhammed KV">

<meta name="theme-color" content="#F5F4EF" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#07080C" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/mkv-logo.png" type="image/png">
<link rel="apple-touch-icon" href="/mkv-logo.png">

<meta name="geo.region" content="IN-KL">
<meta name="geo.placename" content="Calicut">

<meta property="og:site_name" content="Muhammed KV">
<meta property="og:title" content="${s.title}">
<meta property="og:description" content="${s.description}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="en_IN">
<meta property="og:image" content="${SITE}/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Muhammed KV, digital marketer and web developer in Calicut, Kerala">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${s.title}">
<meta name="twitter:description" content="${s.description}">
<meta name="twitter:image" content="${SITE}/og-image.jpg">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap">
<link rel="stylesheet" href="/assets/style.css">
<script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
</script>
</head>
<body>

${botnav}

${header}

<main id="top">

  <section class="case-hero wrap">
    <a class="case-back" href="/#services"><span aria-hidden="true">←</span> All services</a>
    <span class="idx">${s.kicker}</span>
    <h1>${s.name}</h1>
    <p class="case-lede">${s.lede}</p>
    <dl class="case-meta">
      <div><dt>Based in</dt><dd>Calicut (Kozhikode), Kerala</dd></div>
      <div><dt>Works with</dt><dd>Businesses across Kerala and India</dd></div>
      <div><dt>Enquiries</dt><dd><a href="#contact">Start a project <span aria-hidden="true">↓</span></a></dd></div>
    </dl>
  </section>

  <section class="wrap case-body">
    <div class="case-block reveal">
      <span class="idx">The problem</span>
      ${s.brief.map((p) => `<p>${p}</p>`).join('\n      ')}
    </div>

    <div class="case-block reveal">
      <span class="idx">What the work covers</span>
      <div class="case-steps">
${steps}
      </div>
    </div>

    <div class="case-block reveal">
      <span class="idx">What to expect</span>
      <p>${s.outcome}</p>
      <a class="btn primary case-cta" href="#contact">Start a project <span class="arw">↗</span></a>
    </div>
  </section>

  <section class="wrap">
    <span class="idx">Common questions</span>
    <div class="faq reveal">
${faq}
    </div>
  </section>
${relatedBlock}

${contact}

</main>

${footer}

<script src="/assets/app.js" defer></script>
</body>
</html>
`;
}

let n = 0;
for (const s of SERVICES) {
  const dir = path.join(ROOT, 'services', s.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(s));
  console.log(`  services/${s.slug}/index.html`);
  n++;
}
console.log(`${n} service pages written`);

export { SERVICES };
