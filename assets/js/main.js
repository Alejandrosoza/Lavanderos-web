/* Lavanderos Janitorial — main.js */

/* ============================================================
   SOCIAL MEDIA — paste the full URL to enable each icon.
   Leave empty ("") to keep the icon hidden.
   ============================================================ */
const SOCIAL = {
  facebook: "",
  instagram: "",
  linkedin: ""
};

(function () {
  const lang = document.documentElement.lang === "fr" ? "fr" : "en";

  const T = {
    en: {
      sending: "Sending…",
      ok: "Thank you! Your request has been sent. We will contact you within 1 business day.",
      err: "Sorry, something went wrong. Please call us at (867) 334-3929 or email admin@lavanderosjanitorial.ca.",
      invalid: "Please complete all required fields."
    },
    fr: {
      sending: "Envoi en cours…",
      ok: "Merci! Votre demande a été envoyée. Nous vous contacterons d’ici 1 jour ouvrable.",
      err: "Désolé, une erreur s’est produite. Appelez-nous au (867) 334-3929 ou écrivez à admin@lavanderosjanitorial.ca.",
      invalid: "Veuillez remplir tous les champs obligatoires."
    }
  }[lang];

  // Social icons
  document.querySelectorAll("[data-social]").forEach(function (a) {
    const url = SOCIAL[a.getAttribute("data-social")];
    if (url) { a.href = url; a.hidden = false; }
  });

  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Quote form
  const form = document.getElementById("quote-form");
  if (!form) return;
  const status = document.getElementById("form-status");
  const btn = form.querySelector("button[type=submit]");
  const btnLabel = btn.textContent;

  function show(msg, ok) {
    status.textContent = msg;
    status.className = "form__status " + (ok ? "is-ok" : "is-err");
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); show(T.invalid, false); return; }

    const data = Object.fromEntries(new FormData(form).entries());
    data.lang = lang;

    btn.disabled = true;
    btn.textContent = T.sending;
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.reset();
      show(T.ok, true);
    } catch (err) {
      show(T.err, false);
    } finally {
      btn.disabled = false;
      btn.textContent = btnLabel;
    }
  });
})();
