/* Lavanderos Janitorial — quote form API
   POST /api/quote  ->  sends an email to QUOTE_TO
   Runs behind Nginx on 127.0.0.1:PORT, managed by PM2. */

require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const express = require("express");
const nodemailer = require("nodemailer");

const PORT = Number(process.env.PORT || 3100);
const QUOTE_TO = process.env.QUOTE_TO || "admin@lavanderosjanitorial.ca";
const MAIL_FROM = process.env.MAIL_FROM || process.env.SMTP_USER;

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", "loopback");
app.use(express.json({ limit: "20kb" }));

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

app.use((req, res) => res.status(404).json({ ok: false }));

app.listen(PORT, "127.0.0.1", () => console.log(`Lavanderos quote API on 127.0.0.1:${PORT}`));
