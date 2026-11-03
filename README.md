# lavanderos-web

Website for **Lavanderos Janitorial** — commercial cleaning in Whitehorse, Yukon.
Live: https://lavanderosjanitorial.ca (EN) · https://lavanderosjanitorial.ca/fr/ (FR)

## Structure

```
index.html            English page (generated)
fr/index.html         French page (generated)
assets/css|js|img     Styles, script, logo, favicon
images/               Replaceable images (hero.svg, team.svg)
build/content.js      ALL site text (EN + FR) — edit here
build/build.js        Generates the HTML pages, sitemap.xml, robots.txt
server/               Quote form API (Node + Express + Nodemailer)
deploy/               Nginx config
```

## Editing text

1. Edit `build/content.js`
2. Run `node build/build.js`
3. Commit and deploy

## Replacing images

Put the real photo in `images/` with the same name (e.g. `hero.jpg`) and update the
filename in `build/build.js`, then rebuild. Recommended size: 1200×900 px, JPG or WebP.

## Social media

Open `assets/js/main.js` and paste the URLs in the `SOCIAL` object at the top.
Icons appear automatically once a URL is set.

## Quote form

`POST /api/quote` → email to `QUOTE_TO`. Configure `server/.env` from `server/.env.example`.
Runs on `127.0.0.1:3100` with PM2 (`server/ecosystem.config.js`), proxied by Nginx.
