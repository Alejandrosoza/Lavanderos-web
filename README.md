# lavanderos-web

Website for **Lavanderos Janitorial** — commercial cleaning in Whitehorse, Yukon.
Live: https://lavanderosjanitorial.ca (EN) · https://lavanderosjanitorial.ca/fr/ (FR)

## Structure

```
public/               Everything served to visitors (only this folder is public)
  index.html          English page (generated)
  fr/index.html       French page (generated)
  assets/             Styles, script, logo, favicon
  images/             Replaceable images (hero.svg, team.svg)
build/content.js      ALL site text (EN + FR) — edit here
build/build.js        Generates the HTML pages, sitemap.xml, robots.txt into public/
server/               Node server: serves public/ + quote form API
```

## Editing text

1. Edit `build/content.js`
2. Run `node build/build.js`
3. Commit and deploy

## Replacing images

Put the real photo in `public/images/` with the same name (e.g. `hero.jpg`) and update the
filename in `build/build.js`, then rebuild. Recommended size: 1200×900 px, JPG or WebP.

## Social media

Open `public/assets/js/main.js` and paste the URLs in the `SOCIAL` object at the top.
Icons appear automatically once a URL is set.

## Quote form

`POST /api/quote` → email to `QUOTE_TO`. Configure `server/.env` from `server/.env.example`.

## Hosting (CloudPanel)

CloudPanel **Node.js site**, app port `3100`, site user `lavanderos`.
The Node server (PM2, `server/ecosystem.config.js`) serves `public/` and `/api/*`.

Update the live site:

```bash
cd /home/lavanderos/htdocs/lavanderosjanitorial.ca && git pull && cd server && npm ci --omit=dev && pm2 restart lavanderos-web
```
