/* =====================================================================
   MOLNÁR BORPINCE – OLDAL LOGIKA
   - Többnyelvűség (i18n) + nyelvváltó (földgömb)
   - Navigáció (görgetés-érzékeny fejléc, mobil menü)
   - Borkatalógus dinamikus generálása (ár nélkül), bortípus-szűrés
   - Foglalási űrlap: validáció + szimulált küldés + sikerüzenet
   - Megjelenési (scroll reveal) animációk
   ===================================================================== */

/* --------------------------- i18n állapot ------------------------- */

const DEFAULT_LANG = "hu";
let currentLang = DEFAULT_LANG;
let currentFilter = "mind";
let refreshErrors = () => {}; // a foglalási űrlap állítja be

function localeOf(code) {
  const l = LANGS.find((x) => x.code === code);
  return l ? l.locale : "hu-HU";
}

/* Fordítás kulcs alapján (visszaesés magyarra, majd a kulcsra) */
function t(key) {
  const dict = I18N[currentLang] || I18N[DEFAULT_LANG];
  return (dict && dict[key]) ?? I18N[DEFAULT_LANG][key] ?? key;
}

/* Nyelvfüggő mező feloldása: { hu, en, ... } -> az aktuális nyelv értéke */
function localize(field) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[currentLang] ?? field[DEFAULT_LANG] ?? "";
}

function detectInitialLang() {
  // Az alapértelmezett MINDIG a magyar; a böngésző nyelvét NEM vesszük át.
  // Csak a látogató korábbi, kézi választását jegyezzük meg.
  const saved = localStorage.getItem("mb-lang");
  if (saved && LANGS.some((l) => l.code === saved)) return saved;
  return DEFAULT_LANG;
}

/* ----------------------- Nyelv alkalmazása ------------------------ */

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("mb-lang", lang);
  document.documentElement.lang = lang;

  // Szöveges tartalmak (innerHTML – tartalmazhat <br>, <strong>, <em>)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18n);
  });
  // Helykitöltők
  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    el.setAttribute("placeholder", t(el.dataset.i18nPh));
  });
  // aria-label feliratok
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  // Fejléc-cím + meta leírás
  document.title = t("meta.title");
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute("content", t("meta.desc"));

  // Nyelvváltó felirat + aktív elem
  const cur = document.getElementById("lang-current");
  if (cur) cur.textContent = lang.toUpperCase();
  document.querySelectorAll("#lang-menu [data-lang]").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.lang === lang);
  });

  buildGuestOptions();
  renderWines();
  refreshErrors();
}

/* ------------------------- Nyelvváltó UI -------------------------- */

function initLangSwitcher() {
  const wrap = document.getElementById("lang-switcher");
  const toggle = document.getElementById("lang-toggle");
  const menu = document.getElementById("lang-menu");

  // Lista feltöltése a LANGS alapján
  menu.innerHTML = LANGS.map(
    (l) => `<li><button type="button" data-lang="${l.code}" role="menuitem">${l.name}</button></li>`
  ).join("");

  const setOpen = (open) => {
    menu.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    wrap.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(menu.classList.contains("hidden"));
  });

  menu.querySelectorAll("[data-lang]").forEach((btn) =>
    btn.addEventListener("click", () => {
      applyLanguage(btn.dataset.lang);
      setOpen(false);
    })
  );

  // Kattintás kívülre / Escape => bezár
  document.addEventListener("click", (e) => {
    if (!wrap.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

/* --------------------------- Navigáció ---------------------------- */

function initNav() {
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const burgerOpen = toggle.querySelector(".burger-open");
  const burgerClose = toggle.querySelector(".burger-close");

  const onScroll = () => {
    nav.classList.toggle("nav-solid", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    mobileMenu.classList.toggle("hidden", !open);
    burgerOpen.classList.toggle("hidden", open);
    burgerClose.classList.toggle("hidden", !open);
    toggle.setAttribute("aria-expanded", String(open));
    if (open) nav.classList.add("nav-solid");
    else onScroll();
  };

  toggle.addEventListener("click", () =>
    setMenu(mobileMenu.classList.contains("hidden"))
  );
  mobileMenu.querySelectorAll(".mobile-link").forEach((link) =>
    link.addEventListener("click", () => setMenu(false))
  );
}

/* ------------------------- Borkatalógus --------------------------- */

function getFilteredWines() {
  return currentFilter === "mind"
    ? WINES
    : WINES.filter((w) => w.tipus === currentFilter);
}

function renderWines() {
  const grid = document.getElementById("wine-grid");
  const wines = getFilteredWines();
  grid.innerHTML = "";

  if (!wines.length) {
    grid.innerHTML = `<p class="col-span-full text-center text-ink-muted">${t("wine.empty")}</p>`;
    return;
  }

  wines.forEach((wine, index) => {
    const jegyek = localize(wine.jegyek) || [];
    const card = document.createElement("article");
    card.className = "wine-card";
    card.innerHTML = `
      <div class="wine-media wine-media--${wine.tema}">
        <img src="${wine.kep}" alt="${wine.nev} – Molnár Borpince" class="wine-photo" loading="lazy" decoding="async" />
        <span class="wine-type-badge">${t("type." + wine.tema)}</span>
        ${wine.dijnyertes ? `
          <span class="award-ribbon" title="${localize(wine.dij)}">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8L12 2z"/>
            </svg>
            ${t("wine.award")}
          </span>` : ""}
      </div>

      <div class="flex flex-1 flex-col p-6">
        <div class="flex items-baseline justify-between gap-3">
          <h3 class="font-serif text-xl font-semibold leading-snug">${wine.nev}</h3>
          <p class="shrink-0 font-serif text-sm italic text-ink-muted">${wine.evjarat}</p>
        </div>
        <p class="mt-0.5 text-sm text-ink-muted">${wine.fajta} · ${wine.alkohol}</p>

        <p class="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">${localize(wine.leiras)}</p>

        <div class="mt-4 flex flex-wrap gap-2">
          ${jegyek.map((j) => `<span class="wine-tag">${j}</span>`).join("")}
        </div>

        ${wine.dijnyertes ? `
          <p class="mt-4 flex items-center gap-2 text-xs font-medium text-gold-dark">
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="9" r="6"/><path d="M9 14.5L7.5 22l4.5-2.5L16.5 22 15 14.5"/>
            </svg>
            ${localize(wine.dij)}
          </p>` : ""}

        <div class="mt-5 border-t border-sand-200 pt-5">
          <button type="button" class="wine-cta rounded-full border border-forest px-5 py-2 text-xs font-semibold uppercase tracking-widest text-forest transition hover:bg-forest hover:text-sand-50"
                  data-wine="${wine.nev}" data-evjarat="${wine.evjarat}">
            ${t("wine.cta")}
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
    observeReveal(card, index * 90);
  });

  // „Megkóstolnám” gomb: a foglaláshoz görget és előtölti a megjegyzést
  grid.querySelectorAll(".wine-cta").forEach((btn) =>
    btn.addEventListener("click", () => {
      const megjegyzes = document.getElementById("megjegyzes");
      megjegyzes.value = t("wine.interest")
        .replace("{wine}", btn.dataset.wine)
        .replace("{year}", btn.dataset.evjarat);
      document.getElementById("foglalas").scrollIntoView({ behavior: "smooth" });
      setTimeout(() => document.getElementById("nev").focus({ preventScroll: true }), 600);
    })
  );
}

function initWineFilters() {
  const buttons = document.querySelectorAll("#wine-filters .filter-btn");
  buttons.forEach((btn) =>
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      currentFilter = btn.dataset.filter;
      renderWines();
    })
  );
}

/* ------------------------ Vendég-opciók --------------------------- */

/* A megfelelő egység-alak az aktuális nyelv többes-szabályai szerint
   (pl. lengyel/szlovák: 1 osoba, 2 osoby, 5 osób). Hiányzó alak esetén
   az adott nyelv „guest.unitPlural" értékére esik vissza – nem magyarra. */
function guestForm(key) {
  const d = I18N[currentLang] || {};
  return d[key] || d["guest.unitPlural"] || t("guest.unitPlural");
}

function guestLabel(n) {
  const cat = new Intl.PluralRules(localeOf(currentLang)).select(n);
  const keyByCat = {
    one: "guest.unit",
    few: "guest.unitFew",
    many: "guest.unitMany",
    two: "guest.unitPlural",
    other: "guest.unitPlural",
  };
  return guestForm(keyByCat[cat] || "guest.unitPlural");
}

function buildGuestOptions() {
  const sel = document.getElementById("vendegek");
  if (!sel) return;
  const prev = sel.value; // stabil érték (szám vagy "group")
  let html = `<option value="" disabled ${prev ? "" : "selected"}>${t("form.guestsPh")}</option>`;
  for (let n = 1; n <= 8; n++) {
    html += `<option value="${n}" ${prev === String(n) ? "selected" : ""}>${n} ${guestLabel(n)}</option>`;
  }
  html += `<option value="group" ${prev === "group" ? "selected" : ""}>${t("guest.group")}</option>`;
  sel.innerHTML = html;
}

/* A kiválasztott vendégérték olvasható (aktuális nyelvű) szövege */
function guestDisplay(value) {
  if (value === "group") return t("guest.group");
  const n = Number(value);
  return `${n} ${guestLabel(n)}`;
}

/* ------------------------ Foglalási űrlap ------------------------- */

function initBookingForm() {
  const form = document.getElementById("booking-form");
  const successPanel = document.getElementById("booking-success");
  const submitBtn = document.getElementById("booking-submit");

  const today = new Date().toISOString().split("T")[0];
  document.getElementById("datum").min = today;

  // Szabályok: a hibaüzenetek t()-ből jönnek, így nyelvfüggők
  const rules = {
    nev: (v) => (v.trim().length >= 3 ? "" : t("err.name")),
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : t("err.email"),
    telefon: (v) =>
      /^\+?[\d\s\-()\/]{7,}$/.test(v.trim()) && v.replace(/\D/g, "").length >= 7
        ? "" : t("err.phone"),
    vendegek: (v) => (v ? "" : t("err.guests")),
    datum: (v) => {
      if (!v) return t("err.date");
      if (v < today) return t("err.datePast");
      return "";
    },
    megjegyzes: () => "",
  };

  const setFieldError = (id, message) => {
    const input = document.getElementById(id);
    const field = input.closest(".field");
    field.classList.toggle("has-error", Boolean(message));
    field.querySelector(".error-msg").textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
  };

  // Nyelvváltáskor a már megjelenített hibák újraszövegezése
  refreshErrors = () => {
    Object.keys(rules).forEach((id) => {
      const input = document.getElementById(id);
      const field = input.closest(".field");
      if (field && field.classList.contains("has-error")) {
        setFieldError(id, rules[id](input.value));
      }
    });
  };

  Object.keys(rules).forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("has-error")) {
        setFieldError(id, rules[id](input.value));
      }
    });
    input.addEventListener("change", () => {
      if (input.closest(".field").classList.contains("has-error")) {
        setFieldError(id, rules[id](input.value));
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstErrorId = null;
    Object.keys(rules).forEach((id) => {
      const message = rules[id](document.getElementById(id).value);
      setFieldError(id, message);
      if (message && !firstErrorId) firstErrorId = id;
    });
    if (firstErrorId) {
      document.getElementById(firstErrorId).focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    submitBtn.disabled = true;
    submitBtn.textContent = t("form.submitting");

    setTimeout(() => {
      const datumSzep = new Date(data.datum).toLocaleDateString(localeOf(currentLang), {
        year: "numeric", month: "long", day: "numeric", weekday: "long",
      });
      document.getElementById("success-summary").innerHTML = t("success.summary")
        .replace("{name}", escapeHTML(data.nev))
        .replace("{date}", datumSzep)
        .replace("{guests}", escapeHTML(guestDisplay(data.vendegek)));

      form.classList.add("hidden");
      successPanel.classList.remove("hidden");
      successPanel.scrollIntoView({ behavior: "smooth", block: "center" });

      submitBtn.disabled = false;
      submitBtn.textContent = t("form.submit");
    }, 900);
  });

  document.getElementById("new-booking").addEventListener("click", () => {
    form.reset();
    Object.keys(rules).forEach((id) => setFieldError(id, ""));
    buildGuestOptions();
    successPanel.classList.add("hidden");
    form.classList.remove("hidden");
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* HTML-escape a felhasználói adatok biztonságos kiírásához */
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* --------------------- Megjelenési animációk ---------------------- */

let revealObserver = null;

function initReveal() {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");
        revealObserver.unobserve(el);
        const delayMs = Number(el.dataset.revealDelay) || 0;
        setTimeout(() => {
          el.classList.remove("reveal", "is-visible");
          el.style.transitionDelay = "";
          delete el.dataset.revealDelay;
        }, 800 + delayMs);
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}

function observeReveal(el, delayMs = 0) {
  el.classList.add("reveal");
  if (delayMs > 0) {
    el.style.transitionDelay = `${delayMs}ms`;
    el.dataset.revealDelay = String(delayMs);
  }
  if (revealObserver) revealObserver.observe(el);
  else el.classList.add("is-visible");
}

/* ------------------------------ INIT ------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initLangSwitcher();
  initReveal();
  applyLanguage(detectInitialLang()); // ez rendereli a borokat és az opciókat is
  initWineFilters();
  initBookingForm();
  document.getElementById("year").textContent = new Date().getFullYear();
});
