/* Lavanderos Janitorial — web server
   - Serves the static site from ../public
   - POST /api/quote  ->  sends an email to QUOTE_TO
   Runs on 127.0.0.1:PORT behind CloudPanel's Nginx (Node.js site), managed by PM2. */

require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const path = require("path");
const express = require("express");
const nodemailer = require("nodemailer");

const PORT = Number(process.env.PORT || 3100);
const QUOTE_TO = process.env.QUOTE_TO || "admin@lavanderosjanitorial.ca";
const MAIL_FROM = process.env.MAIL_FROM || process.env.SMTP_USER;

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", "loopback");
app.use(express.json({ limit: "20kb" }));

/* Security headers */
app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'"
  });
  next();
});

/* Simple in-memory rate limit: 5 requests / 15 min per IP */
const hits = new Map();
const WINDOW = 15 * 60 * 1000, MAX = 5;
function limited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > MAX;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, arr] of hits) if (!arr.some((t) => now - t < WINDOW)) hits.delete(ip);
}, WINDOW).unref();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || "true") === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

const clean = (v, max) => String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, max);
const cleanMultiline = (v, max) => String(v == null ? "" : v).replace(/\r/g, "").trim().slice(0, max);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.post("/api/quote", async (req, res) => {
  const b = req.body || {};

  // Honeypot: bots fill the hidden "website" field. Pretend success.
  if (b.website) return res.json({ ok: true });

  if (limited(req.ip)) return res.status(429).json({ ok: false, error: "rate_limited" });

  const d = {
    name: clean(b.name, 120),
    company: clean(b.company, 160),
    email: clean(b.email, 160),
    phone: clean(b.phone, 40),
    service: clean(b.service, 120),
    frequency: clean(b.frequency, 60),
    size: clean(b.size, 20),
    message: cleanMultiline(b.message, 3000),
    lang: b.lang === "fr" ? "FR" : "EN"
  };

  if (!d.name || !d.phone || !d.service || !EMAIL_RE.test(d.email)) {
    return res.status(400).json({ ok: false, error: "invalid" });
  }

  const rows = [
    ["Name", d.name], ["Company", d.company], ["Email", d.email], ["Phone", d.phone],
    ["Service", d.service], ["Frequency", d.frequency], ["Size (sq ft)", d.size], ["Site language", d.lang]
  ];
  const text = rows.map(([k, v]) => `${k}: ${v || "-"}`).join("\n") + `\n\nMessage:\n${d.message || "-"}`;
  const html =
    `<h2 style="font-family:Arial,sans-serif;color:#0f2a44">New quote request</h2>` +
    `<table style="font-family:Arial,sans-serif;border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="padding:6px 12px;border:1px solid #d9e1e8;font-weight:bold">${k}</td><td style="padding:6px 12px;border:1px solid #d9e1e8">${esc(v || "-")}</td></tr>`).join("") +
    `</table><h3 style="font-family:Arial,sans-serif;color:#0f2a44">Message</h3>` +
    `<p style="font-family:Arial,sans-serif;white-space:pre-wrap">${esc(d.message || "-")}</p>`;

  try {
    await transporter.sendMail({
      from: `"Lavanderos Website" <${MAIL_FROM}>`,
      to: QUOTE_TO,
      replyTo: `"${d.name.replace(/"/g, "")}" <${d.email}>`,
      subject: `New quote request: ${d.service}${d.company ? " – " + d.company : ""}`,
      text, html
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("[quote] sendMail failed:", err.message);
    res.status(502).json({ ok: false, error: "mail_failed" });
  }
});

/* Static site (only the public folder is ever served) */
const PUBLIC_DIR = path.join(__dirname, "..", "public");
app.use(express.static(PUBLIC_DIR, {
  dotfiles: "ignore",
  setHeaders: (res, file) => {
    if (/\.(css|js|svg|png|jpe?g|webp|ico|woff2)$/.test(file)) res.set("Cache-Control", "public, max-age=86400");
    else res.set("Cache-Control", "no-cache");
  }
}));

app.use("/api", (req, res) => res.status(404).json({ ok: false }));
app.use((req, res) => {
  const fr = req.path.startsWith("/fr");
  res.status(404).type("html").send(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` +
    `<title>404</title><body style="font-family:Arial,sans-serif;text-align:center;padding:80px 16px;color:#0f2a44">` +
    `<h1>404</h1><p>${fr ? "Page introuvable." : "Page not found."}</p>` +
    `<p><a href="${fr ? "/fr/" : "/"}" style="color:#2e9e5b">${fr ? "Retour à l’accueil" : "Back to home"}</a></p></body>`
  );
});

app.listen(PORT, "127.0.0.1", () => console.log(`Lavanderos quote API on 127.0.0.1:${PORT}`));
