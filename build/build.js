/* Generates index.html (EN) and fr/index.html (FR) from build/content.js
   Usage: node build/build.js */

const fs = require("fs");
const path = require("path");
const { BIZ, en, fr } = require("./content");

const ROOT = path.join(__dirname, "..", "public");

const esc = (s) => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* Simple line icons (stroke = currentColor) */
const ICONS = {
  office: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3"/>',
  building: '<path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6M9 10h.01M15 10h.01"/>',
  hammer: '<path d="M14 6l4 4M3 21l9-9M12 4l3-2 7 7-2 3-3-1-5 5-4-4 5-5z"/>',
  floor: '<path d="M3 17l9 4 9-4M3 12l9 4 9-4M3 7l9-4 9 4-9 4z"/>',
  carpet: '<rect x="3" y="6" width="18" height="12" rx="1"/><path d="M7 6v12M17 6v12M10 10h4M10 14h4"/>',
  window: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
  box: '<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10M10 20v-5h4v5"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="1"/><path d="M8 7V4h8v3M3 13h18"/>',
  gov: '<path d="M3 21h18M4 10h16M12 3l8 5H4z"/><path d="M6 10v8M10 10v8M14 10v8M18 10v8"/>',
  heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
  crane: '<path d="M4 21V5h2v16M6 5h14l-4 4M6 9h10M16 9v5"/><rect x="14" y="14" width="4" height="3"/><path d="M2 21h8"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  phone: '<path d="M5 3h4l2 5-3 2a11 11 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'
};
const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;

const SOCIAL_ICONS = {
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v7h4v-7h3l1-4h-4V8.6c0-.4.2-.6.6-.6z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9h4v12H4zM6 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.4 2.6 4.4 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21h-4z"/></svg>'
};

function page(c) {
  const p = c.lang === "fr" ? "../" : "";            // relative prefix to root assets
  const altLabel = c.lang === "fr" ? "EN" : "FR";
  const curLabel = c.lang === "fr" ? "FR" : "EN";
  const altHreflang = c.lang === "fr" ? "en" : "fr";
  const year = new Date().getFullYear();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": BIZ.domain + "/#business",
    name: BIZ.name,
    url: BIZ.domain + c.path,
    telephone: BIZ.phoneHref,
    email: BIZ.email,
    image: BIZ.domain + "/assets/img/logo.svg",
    logo: BIZ.domain + "/assets/img/logo.svg",
    foundingDate: String(BIZ.since),
    description: c.description,
    address: { "@type": "PostalAddress", addressLocality: "Whitehorse", addressRegion: "YT", addressCountry: "CA" },
    areaServed: { "@type": "City", name: "Whitehorse" },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" }],
    knowsLanguage: ["en", "fr", "es"]
  };

  // Language switch: current is highlighted, other is a link
  const langSwitch = c.lang === "fr"
    ? `<a href="/" hreflang="en" lang="en">EN</a><span class="is-active" aria-current="true">FR</span>`
    : `<span class="is-active" aria-current="true">EN</span><a href="/fr/" hreflang="fr" lang="fr">FR</a>`;

  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.title)}</title>
<meta name="description" content="${esc(c.description)}">
<link rel="canonical" href="${BIZ.domain}${c.path}">
<link rel="alternate" hreflang="${c.lang}" href="${BIZ.domain}${c.path}">
<link rel="alternate" hreflang="${altHreflang}" href="${BIZ.domain}${c.altPath}">
<link rel="alternate" hreflang="x-default" href="${BIZ.domain}/">
<meta name="theme-color" content="#0f2a44">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(c.title)}">
<meta property="og:description" content="${esc(c.description)}">
<meta property="og:url" content="${BIZ.domain}${c.path}">
<meta property="og:locale" content="${c.lang === "fr" ? "fr_CA" : "en_CA"}">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="${p}assets/css/styles.css">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<a class="skip" href="#main">${esc(c.skip)}</a>

<div class="langbar">
  <div class="container">
    <span class="langbar__note">${esc(c.langbarNote)}</span>
    <div><span class="langbar__label">Language / Langue</span><nav class="lang-switch" aria-label="Language" style="display:inline-flex">${langSwitch}</nav></div>
  </div>
</div>

<header class="header">
  <div class="container">
    <a class="brand" href="${c.path}" aria-label="${esc(BIZ.name)}"><img src="${p}assets/img/logo.svg" alt="${esc(BIZ.name)}" width="206" height="44"></a>
    <button class="nav-toggle" aria-controls="nav" aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
    <nav class="nav" id="nav" aria-label="Main">
      <a href="#services">${esc(c.nav.services)}</a>
      <a href="#industries">${esc(c.nav.industries)}</a>
      <a href="#why">${esc(c.nav.why)}</a>
      <a href="#process">${esc(c.nav.process)}</a>
      <a href="#contact">${esc(c.nav.contact)}</a>
      <a class="nav-lang" href="${c.altPath}" hreflang="${altHreflang}" lang="${altHreflang}">${icon("globe")}${c.lang === "fr" ? "English" : "Français"}</a>
      <a class="btn btn--primary btn--sm" href="#contact">${esc(c.nav.cta)}</a>
    </nav>
  </div>
</header>

<main id="main">

<section class="hero">
  <div class="container">
    <div>
      <span class="eyebrow">${esc(c.hero.eyebrow)}</span>
      <h1>${esc(c.hero.title)}</h1>
      <p class="hero__sub">${esc(c.hero.sub)}</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#contact">${esc(c.hero.cta1)}</a>
        <a class="btn btn--outline" href="tel:${BIZ.phoneHref}">${icon("phone")} ${esc(c.hero.cta2)} ${esc(BIZ.phone)}</a>
      </div>
      <ul class="badges">
        ${c.hero.badges.map((b) => `<li>${icon("check")}${esc(b)}</li>`).join("\n        ")}
      </ul>
    </div>
    <div class="hero__art">
      <img src="${p}images/hero.svg" alt="${esc(c.hero.artAlt)}" width="480" height="360">
    </div>
  </div>
</section>

<section class="trust" aria-label="Highlights">
  <div class="container">
    ${c.trust.map((t) => `<div class="trust__item"><div class="trust__num">${esc(t.num)}</div><div class="trust__label">${esc(t.label)}</div></div>`).join("\n    ")}
  </div>
</section>

<section class="section" id="services">
  <div class="container">
    <div class="section__head">
      <span class="eyebrow">${esc(c.services.eyebrow)}</span>
      <h2>${esc(c.services.title)}</h2>
      <p class="lead">${esc(c.services.lead)}</p>
    </div>
    <div class="grid grid--3">
      ${c.services.items.map((s) => `<article class="card"><div class="icon">${icon(s.icon)}</div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></article>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="section section--alt" id="industries">
  <div class="container">
    <div class="section__head">
      <span class="eyebrow">${esc(c.industries.eyebrow)}</span>
      <h2>${esc(c.industries.title)}</h2>
    </div>
    <div class="grid grid--4">
      ${c.industries.items.map((s) => `<article class="card"><div class="icon">${icon(s.icon)}</div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></article>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="section" id="why">
  <div class="container split">
    <div>
      <span class="eyebrow">${esc(c.why.eyebrow)}</span>
      <h2>${esc(c.why.title)}</h2>
      <ul class="checklist">
        ${c.why.items.map((w) => `<li>${icon("check")}<div><strong>${esc(w.t)}</strong><span>${esc(w.d)}</span></div></li>`).join("\n        ")}
      </ul>
    </div>
    <div class="photo-slot">
      <img src="${p}images/team.svg" alt="${esc(c.why.photoAlt)}" width="480" height="360">
    </div>
  </div>
</section>

<section class="section section--alt" id="process">
  <div class="container">
    <div class="section__head">
      <span class="eyebrow">${esc(c.process.eyebrow)}</span>
      <h2>${esc(c.process.title)}</h2>
    </div>
    <div class="steps">
      ${c.process.steps.map((s) => `<div class="step"><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p></div>`).join("\n      ")}
    </div>
  </div>
</section>

<section class="cta">
  <div class="container">
    <div>
      <h2>${esc(c.cta.title)}</h2>
      <p>${esc(c.cta.sub)}</p>
    </div>
    <div class="hero__actions" style="margin:0">
      <a class="btn btn--primary" href="#contact">${esc(c.cta.btn1)}</a>
      <a class="btn btn--outline" href="tel:${BIZ.phoneHref}">${esc(c.cta.btn2)} ${esc(BIZ.phone)}</a>
    </div>
  </div>
</section>

<section class="section" id="contact">
  <div class="container quote">
    <div>
      <span class="eyebrow">${esc(c.contact.eyebrow)}</span>
      <h2>${esc(c.contact.title)}</h2>
      <p class="lead">${esc(c.contact.lead)}</p>
      <ul class="contact-list">
        <li>${icon("phone")}<div><strong>${esc(c.contact.phone)}</strong><a href="tel:${BIZ.phoneHref}">${esc(BIZ.phone)}</a></div></li>
        <li>${icon("mail")}<div><strong>${esc(c.contact.email)}</strong><a href="mailto:${BIZ.email}">${esc(BIZ.email)}</a></div></li>
        <li>${icon("pin")}<div><strong>${esc(c.contact.area)}</strong><span class="val">${esc(c.contact.areaVal)}</span></div></li>
        <li>${icon("clock")}<div><strong>${esc(c.contact.hours)}</strong><span class="val">${esc(c.contact.hoursVal)}</span></div></li>
      </ul>
    </div>
    <form class="form" id="quote-form" novalidate>
      <div class="form__row">
        <div class="field"><label for="f-name">${esc(c.contact.form.name)} <span class="req" aria-label="${esc(c.contact.form.required)}">*</span></label><input id="f-name" name="name" autocomplete="name" required maxlength="120"></div>
        <div class="field"><label for="f-company">${esc(c.contact.form.company)}</label><input id="f-company" name="company" autocomplete="organization" maxlength="160"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="f-email">${esc(c.contact.form.email)} <span class="req" aria-label="${esc(c.contact.form.required)}">*</span></label><input id="f-email" name="email" type="email" autocomplete="email" required maxlength="160"></div>
        <div class="field"><label for="f-phone">${esc(c.contact.form.phone)} <span class="req" aria-label="${esc(c.contact.form.required)}">*</span></label><input id="f-phone" name="phone" type="tel" autocomplete="tel" required maxlength="40"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="f-service">${esc(c.contact.form.service)} <span class="req" aria-label="${esc(c.contact.form.required)}">*</span></label>
          <select id="f-service" name="service" required>
            <option value="">${esc(c.contact.form.servicePh)}</option>
            ${c.services.items.map((s) => `<option>${esc(s.t)}</option>`).join("\n            ")}
          </select>
        </div>
        <div class="field"><label for="f-frequency">${esc(c.contact.form.frequency)}</label>
          <select id="f-frequency" name="frequency">
            ${c.contact.form.frequencyOpts.map((o) => `<option>${esc(o)}</option>`).join("\n            ")}
          </select>
        </div>
      </div>
      <div class="field"><label for="f-size">${esc(c.contact.form.size)}</label><input id="f-size" name="size" inputmode="numeric" maxlength="20"></div>
      <div class="field"><label for="f-message">${esc(c.contact.form.message)}</label><textarea id="f-message" name="message" maxlength="3000" placeholder="${esc(c.contact.form.messagePh)}"></textarea></div>
      <div class="hp" aria-hidden="true"><label for="f-website">Website</label><input id="f-website" name="website" tabindex="-1" autocomplete="off"></div>
      <button class="btn btn--primary" type="submit">${esc(c.contact.form.submit)}</button>
      <p class="form__note">${esc(c.contact.form.note)}</p>
      <div class="form__status" id="form-status" role="status" aria-live="polite"></div>
    </form>
  </div>
</section>

</main>

<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <img class="footer__logo" src="${p}assets/img/logo-white.svg" alt="${esc(BIZ.name)}" width="206" height="44" loading="lazy">
        <p>${esc(c.footer.about)}</p>
        <div class="social">
          ${Object.keys(SOCIAL_ICONS).map((k) => `<a data-social="${k}" href="#" target="_blank" rel="noopener" aria-label="${k[0].toUpperCase() + k.slice(1)}" hidden>${SOCIAL_ICONS[k]}</a>`).join("\n          ")}
        </div>
      </div>
      <div>
        <h4>${esc(c.footer.services)}</h4>
        <ul>
          ${c.services.items.slice(0, 6).map((s) => `<li><a href="#services">${esc(s.t)}</a></li>`).join("\n          ")}
        </ul>
      </div>
      <div>
        <h4>${esc(c.footer.company)}</h4>
        <ul>
          <li><a href="#industries">${esc(c.nav.industries)}</a></li>
          <li><a href="#why">${esc(c.nav.why)}</a></li>
          <li><a href="#process">${esc(c.nav.process)}</a></li>
          <li><a href="${c.altPath}" hreflang="${altHreflang}">${esc(c.footer.langLink)}</a></li>
        </ul>
      </div>
      <div>
        <h4>${esc(c.footer.contact)}</h4>
        <ul>
          <li><a href="tel:${BIZ.phoneHref}">${esc(BIZ.phone)}</a></li>
          <li><a href="mailto:${BIZ.email}">${esc(BIZ.email)}</a></li>
          <li>${esc(c.contact.areaVal)}</li>
          <li>${esc(c.contact.hoursVal)}</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>&copy; <span id="year">${year}</span> ${esc(BIZ.name)}. ${esc(c.footer.rights)}</span>
      <span>Whitehorse, Yukon, Canada</span>
    </div>
  </div>
</footer>

<script src="${p}assets/js/main.js" defer></script>
</body>
</html>
`;
}

fs.writeFileSync(path.join(ROOT, "index.html"), page(en));
fs.mkdirSync(path.join(ROOT, "fr"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "fr", "index.html"), page(fr));

// sitemap
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${BIZ.domain}/</loc><lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${BIZ.domain}/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${BIZ.domain}/fr/"/></url>
  <url><loc>${BIZ.domain}/fr/</loc><lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${BIZ.domain}/"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${BIZ.domain}/fr/"/></url>
</urlset>
`);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${BIZ.domain}/sitemap.xml\n`);

console.log("Built: index.html, fr/index.html, sitemap.xml, robots.txt");
