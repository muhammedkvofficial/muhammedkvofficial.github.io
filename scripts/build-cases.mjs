// Generates the case study pages under /work/<slug>/ from the data below.
// Shared chrome (nav, bottom nav, footer, contact) is defined once here, so a
// change to any of it rebuilds all three pages the same way.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.muhammedkv.com';

const CASES = [
  {
    slug: 'zedutoys',
    name: 'Zedutoys',
    kicker: 'E-commerce · Branding · Web',
    title: 'Zedutoys Case Study: Educational Toys E-commerce Store',
    description:
      'How the Zedutoys online store was designed and built around how children learn: brand identity, a developmental collections system and age-based browsing.',
    lede: 'An educational toys store built around how children learn, not just what they sell.',
    role: 'Brand identity, UI design, e-commerce build',
    scope: 'Logo, collections system, product pages, SEO-ready structure',
    liveLabel: 'zedutoys.com',
    liveUrl: 'https://www.zedutoys.com',
    shot: { src: '/zedutoys-home.jpg', w: 1200, h: 900, alt: 'Zedutoys homepage, an educational toys store designed and developed by Muhammed KV' },
    second: { src: '/logo-zedutoys.jpg', w: 640, h: 640, alt: 'Zedutoys logo: a multicoloured handprint mark above a playful wordmark' },
    secondCap: 'The mark pairs a child’s handprint with a multicoloured wordmark, carrying the Fun · Learning · Creativity line.',
    brief: [
      'Zedutoys sells educational and mind-developing toys for children and students. They needed a store, but a plain product grid would not have served them.',
      'Parents do not shop for &ldquo;toys&rdquo; in the abstract. They shop for a particular child, at a particular age, and they are usually trying to encourage something specific: motor skills, problem solving, creativity. A catalogue organised by product type leaves them to work all of that out for themselves.',
    ],
    did: [
      ['Brand identity', 'Logo and visual language for the store, built on a child’s handprint and a multicoloured wordmark, with the line Fun · Learning · Creativity.'],
      ['A collections system', 'Products grouped as MindSprout, MakeSprout and ZingPlay, so the structure reflects what a toy develops rather than what it physically is.'],
      ['Age-based browsing', 'A second way in through Kinder Garden, Active Kid and Brain Power, so a parent can start from their child rather than from the catalogue.'],
      ['Store design', 'Category grid, trending products, product pages, and a video section for reviews and how-to content.'],
      ['Built to be found', 'Clean, SEO-ready structure and a mobile-first layout, so the store can rank rather than relying on paid traffic alone.'],
    ],
    outcome:
      'The store is live at zedutoys.com with both routes in place: shop by what a toy develops, or by the age it suits. The branding runs through the logo, the collection names and the product pages as one piece.',
  },
  {
    slug: 'royal-trading-academy',
    name: 'Royal Trading Academy',
    kicker: 'Social Media · Graphic Design · Branding',
    title: 'Royal Trading Academy Case Study: Instagram Design & Handling',
    description:
      'Designing one visual system for a UAE forex academy’s Instagram and handling the page day to day, across a 23.5K-follower audience.',
    lede: 'One visual system holding a 23.5K-follower forex academy together.',
    role: 'Post design, page handling',
    scope: 'Campaign creatives, recurring series, bilingual posts, daily posting',
    liveLabel: '@royalacademy_ae',
    liveUrl: 'https://www.instagram.com/royalacademy_ae/',
    shot: { src: '/royal-academy-grid.jpg', w: 1200, h: 798, alt: 'Six Instagram posts designed for Royal Trading Academy, showing the green, black and gold visual system' },
    second: null,
    secondCap: null,
    brief: [
      'Royal Trading Academy is a forex trading institute in the UAE, teaching a largely Malayali audience across the Gulf. The account had reach, but posts were being made one at a time, with no system holding them together.',
      'The problem with that on Instagram is the grid. A visitor judges an account in about a second, from nine thumbnails at once. If every post looks like it came from somewhere else, the account reads as improvised, which is the opposite of what a trading school is selling.',
    ],
    did: [
      ['A visual system', 'One palette and type treatment across every post: deep green, black and gold, anchored on the TR monogram, so the grid reads as one brand.'],
      ['Recurring formats', 'Repeatable templates for the series that run regularly, including Trader of the Week student features and course campaign creatives.'],
      ['Bilingual posts', 'English and Malayalam posts designed in the same system, because the audience is Malayali but the subject matter is technical.'],
      ['Day-to-day handling', 'Planning, designing and posting the content as an ongoing job, not a one-off handover.'],
    ],
    outcome:
      'The account now reads as a single brand rather than a stream of individual posts, with a grid a prospective student can judge at a glance, across an audience of 23.5K.',
  },
  {
    slug: 'nadan-camp',
    name: 'Nadan Camp',
    kicker: 'Social Media · Meta Ads · Growth',
    title: 'Nadan Camp Case Study: An Instagram Grown From Zero',
    description:
      'Starting a Kerala travel community’s Instagram from an empty account and growing it past 1,700 followers, with Meta reel campaigns behind the content.',
    lede: 'A travel community’s Instagram, started at zero and grown past 1,700.',
    role: 'Account build, content, paid social',
    scope: 'Content planning, reels, Meta ad campaigns, daily handling',
    liveLabel: '@nadancamp_',
    liveUrl: 'https://www.instagram.com/nadancamp_/',
    shot: { src: '/nadan-camp-grid.jpg', w: 1200, h: 798, alt: 'Six Nadan Camp travel reels on Instagram, covering Wayanad, Manali, Ladakh, Rajasthan and Nagaland' },
    second: null,
    secondCap: null,
    brief: [
      'Nadan Camp runs group travel across India for a Kerala audience. When I started, the account was empty: no followers, no posts, no audience to inherit.',
      'Travel is also one of the harder things to sell cold. Nobody books a trip with strangers from a single advert. They need to see where the group actually goes, and what being on one of those trips looks like, before a booking message feels reasonable.',
    ],
    did: [
      ['Built the account from zero', 'Set up the page, its identity and its voice, and established a posting rhythm from an empty start.'],
      ['Reels-first content', 'Travel is a moving-image subject, so the content leads with reels from real trips: Wayanad, Manali, Ladakh, Rajasthan and the Hornbill festival in Nagaland.'],
      ['Campaign creatives', 'Designed trip-specific posts carrying the dates and a direct WhatsApp call to action, so interest converts into a booking conversation.'],
      ['Meta ad campaigns', 'Paid promotion put behind the reels that earned it organically, rather than boosting everything evenly.'],
      ['Ongoing handling', 'Planning, posting and running the campaigns as a continuing job.'],
    ],
    outcome:
      'From an empty account to past 1,700 followers, with a content and paid system running behind it: reels prove the trips are real, and campaign posts turn that into booking conversations.',
  },
];

/* ---------------- shared chrome ---------------- */

const navLinks = `      <a href="/#about">About</a>
      <a href="/#work">Work <sup>(12)</sup></a>
      <a href="/#services">Services <sup>(06)</sup></a>
      <a href="/#experience">Experience <sup>(03)</sup></a>
      <a href="/#faq">FAQ <sup>(07)</sup></a>`;

const botnav = `<nav class="botnav" aria-label="Sections">
  <a href="/#about"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/></svg><span>About</span></a>
  <a href="/#work" class="active" aria-current="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3.2" y="4.2" width="7" height="7" rx="1.8"/><rect x="13.8" y="4.2" width="7" height="7" rx="1.8"/><rect x="3.2" y="12.8" width="7" height="7" rx="1.8"/><rect x="13.8" y="12.8" width="7" height="7" rx="1.8"/></svg><span>Work</span></a>
  <a href="/#services"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3.2 14.3 9l5.8 2.3-5.8 2.3L12 19.4 9.7 13.6 3.9 11.3 9.7 9Z"/></svg><span>Services</span></a>
  <a href="/#faq"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="8.8"/><path d="M9.6 9.4a2.5 2.5 0 1 1 3.3 2.4c-.6.2-.9.8-.9 1.4v.5"/><circle cx="12" cy="16.6" r=".9" fill="currentColor" stroke="none"/></svg><span>FAQ</span></a>
  <a href="#contact"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 3.8 10.9 13.4"/><path d="M20.5 3.8 14.4 20.6l-3.5-7.2-7.2-3.5Z"/></svg><span>Contact</span></a>
</nav>`;

const header = `<header class="nav" id="nav">
  <div class="wrap nav-inner">
    <a class="nav-brand" href="/" aria-label="Muhammed KV, home">
      <img src="/mkv-logo.png" width="317" height="151" decoding="async" alt="">
      <span class="nav-brand-txt">
        <b>Muhammed KV</b>
        <small>Digital Marketer &amp; Web Developer</small>
      </span>
    </a>
    <nav class="nav-links">
${navLinks}
    </nav>
    <span style="display:flex;align-items:center;gap:8px">
      <button class="theme-btn" id="themeBtn" aria-label="Toggle colour theme" title="Toggle theme">◐</button>
      <a href="#contact" class="nav-cta">Let's talk <span class="arw">↗</span></a>
    </span>
  </div>
</header>`;

const contact = `  <section id="contact" class="wrap contact">
    <span class="idx" style="justify-content:center">Get in touch</span>
    <h2><span class="out">Let's build</span><span>something good</span></h2>
    <p>Got a project in mind: a website, a campaign, or both? Tell me the goal and I'll tell you the shortest route to it.</p>
    <div class="links">
      <a class="btn primary" href="mailto:muhammedkvofficial@gmail.com">Email me <span class="arw">↗</span></a>
      <a class="btn ghost" href="https://wa.me/919995609663" target="_blank" rel="noopener">WhatsApp</a>
      <a class="btn ghost" href="tel:+919995609663">+91 99956 09663</a>
    </div>
    <p class="contact-status"><span class="dot"></span>Available for new projects</p>
  </section>`;

const footer = `<footer class="foot">
  <div class="wrap foot-inner">
    <a href="/" class="brand"><img class="logo-img" src="/mkv-logo.png" width="317" height="151" decoding="async" alt="Muhammed KV logo">Muhammed KV</a>
    <nav>
      <a href="/#about">About</a><a href="/#work">Work</a><a href="/#services">Services</a><a href="/#faq">FAQ</a>
      <a href="/resume/">Resume</a>
      <a href="https://www.linkedin.com/in/muhammedkv-marketing/" target="_blank" rel="noopener">LinkedIn</a>
      <a href="https://www.instagram.com/muhammedkv0" target="_blank" rel="noopener">Instagram</a>
    </nav>
    <small>© <span id="yr">2026</span> Muhammed KV · Calicut, Kerala</small>
  </div>
</footer>`;

/* ---------------- page ---------------- */

function page(c, i) {
  const url = `${SITE}/work/${c.slug}/`;
  const others = CASES.filter((x) => x.slug !== c.slug);

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Work', item: `${SITE}/#work` },
          { '@type': 'ListItem', position: 3, name: c.name, item: url },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': url + '#project',
        name: c.name,
        headline: c.lede,
        description: c.description,
        url,
        image: SITE + c.shot.src,
        creator: { '@id': `${SITE}/#person` },
        author: { '@id': `${SITE}/#person` },
        inLanguage: 'en-IN',
        mainEntityOfPage: url,
      },
      {
        '@type': 'WebPage',
        '@id': url + '#webpage',
        url,
        name: c.title,
        description: c.description,
        isPartOf: { '@id': `${SITE}/#website` },
        about: { '@id': url + '#project' },
        inLanguage: 'en-IN',
      },
    ],
  };

  const didList = c.did
    .map(([h, b]) => `        <div class="case-step">\n          <h3>${h}</h3>\n          <p>${b}</p>\n        </div>`)
    .join('\n');

  const second = c.second
    ? `
    <figure class="case-aside wrap reveal">
      <img src="${c.second.src}" width="${c.second.w}" height="${c.second.h}" loading="lazy" decoding="async" alt="${c.second.alt}">
      <figcaption>${c.secondCap}</figcaption>
    </figure>`
    : '';

  return `<!DOCTYPE html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>${c.title} | Muhammed KV</title>
<meta name="description" content="${c.description}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="author" content="Muhammed KV">

<meta name="theme-color" content="#F5F4EF" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#07080C" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/mkv-logo.png" type="image/png">
<link rel="apple-touch-icon" href="/mkv-logo.png">

<meta property="og:site_name" content="Muhammed KV">
<meta property="og:title" content="${c.title}">
<meta property="og:description" content="${c.description}">
<meta property="og:type" content="article">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="en_IN">
<meta property="og:image" content="${SITE}${c.shot.src}">
<meta property="og:image:width" content="${c.shot.w}">
<meta property="og:image:height" content="${c.shot.h}">
<meta property="og:image:alt" content="${c.shot.alt}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${c.title}">
<meta name="twitter:description" content="${c.description}">
<meta name="twitter:image" content="${SITE}${c.shot.src}">

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
    <a class="case-back" href="/#work"><span aria-hidden="true">←</span> All work</a>
    <span class="idx">Case study · ${String(i + 1).padStart(2, '0')} / ${String(CASES.length).padStart(2, '0')}</span>
    <h1>${c.name}</h1>
    <p class="case-lede">${c.lede}</p>
    <dl class="case-meta">
      <div><dt>Role</dt><dd>${c.role}</dd></div>
      <div><dt>Scope</dt><dd>${c.scope}</dd></div>
      <div><dt>Live</dt><dd><a href="${c.liveUrl}" target="_blank" rel="noopener">${c.liveLabel} <span aria-hidden="true">↗</span></a></dd></div>
    </dl>
  </section>

  <figure class="case-shot wrap reveal">
    <img src="${c.shot.src}" width="${c.shot.w}" height="${c.shot.h}" fetchpriority="high" decoding="async" alt="${c.shot.alt}">
  </figure>

  <section class="wrap case-body">
    <div class="case-block reveal">
      <span class="idx">The brief</span>
      ${c.brief.map((p) => `<p>${p}</p>`).join('\n      ')}
    </div>

    <div class="case-block reveal">
      <span class="idx">What I did</span>
      <div class="case-steps">
${didList}
      </div>
    </div>
${second}
    <div class="case-block reveal">
      <span class="idx">Where it landed</span>
      <p>${c.outcome}</p>
      <a class="btn primary case-cta" href="${c.liveUrl}" target="_blank" rel="noopener">Visit ${c.liveLabel} <span class="arw">↗</span></a>
    </div>
  </section>

  <section class="wrap case-next">
    <span class="idx">More work</span>
    <div class="case-next-grid">
${others.map((o) => `      <a class="case-next-card reveal" href="/work/${o.slug}/">
        <span class="k">${o.kicker}</span>
        <h3>${o.name}</h3>
        <p>${o.lede}</p>
        <span class="case-next-go">Read the case study <span aria-hidden="true">↗</span></span>
      </a>`).join('\n')}
    </div>
  </section>

${contact}

</main>

${footer}

<script src="/assets/app.js" defer></script>
</body>
</html>
`;
}

let n = 0;
for (const [i, c] of CASES.entries()) {
  const dir = path.join(ROOT, 'work', c.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(c, i));
  console.log(`  work/${c.slug}/index.html`);
  n++;
}
console.log(`${n} case study pages written`);

export { CASES, header, botnav, footer, contact };
