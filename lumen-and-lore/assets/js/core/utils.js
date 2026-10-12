/* ==========================================================================
   Utilities — environment flags, DOM helpers, safe storage, text splitting,
   shared render helpers (project cards, avatars)
   ========================================================================== */
window.LL = window.LL || {};

(function (LL) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  LL.reduced = reduced;
  LL.hasGsap = !!(window.gsap && window.ScrollTrigger);
  LL.motion = LL.hasGsap && !reduced;
  LL.finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  LL.pages = LL.pages || {};

  LL.qs = (sel, ctx = document) => ctx.querySelector(sel);
  LL.qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  LL.escape = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Browser storage can throw (private mode, blocked data) — always guard it.
  const safeStore = (type) => ({
    get(key) { try { return window[type].getItem(key); } catch (e) { return null; } },
    set(key, val) { try { window[type].setItem(key, val); } catch (e) { /* ignore */ } },
    remove(key) { try { window[type].removeItem(key); } catch (e) { /* ignore */ } }
  });
  LL.store = safeStore("localStorage");
  LL.session = safeStore("sessionStorage");

  /* Wrap every word in .word > .word-in so it can slide up from a clip mask.
     Nested inline elements (em, a) are preserved; svg and br are skipped. */
  LL.splitWords = function (el) {
    if (el.dataset.splitDone) return LL.qsa(".word-in", el);
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            const word = document.createElement("span");
            word.className = "word";
            const inner = document.createElement("span");
            inner.className = "word-in";
            inner.textContent = part;
            word.appendChild(inner);
            frag.appendChild(word);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && !["BR", "svg", "SVG"].includes(child.tagName) && !child.hasAttribute("data-no-split")) {
          walk(child);
        }
      });
    };
    walk(el);
    el.dataset.splitDone = "1";
    return LL.qsa(".word-in", el);
  };

  LL.splitChars = function (el) {
    if (el.dataset.charsDone) return LL.qsa(".ch", el);
    const text = el.textContent;
    el.setAttribute("aria-label", text.trim());
    el.innerHTML = Array.from(text)
      .map((c) => (c === " " ? " " : `<span class="ch" aria-hidden="true">${LL.escape(c)}</span>`))
      .join("");
    el.dataset.charsDone = "1";
    return LL.qsa(".ch", el);
  };

  // Pick readable text colour for a swatch background.
  LL.textOn = function (hex) {
    const h = hex.replace("#", "");
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return lum > 0.4 ? "#16131B" : "#F7F5F0";
  };

  LL.hexToRgb = function (hex) {
    const h = hex.trim().replace("#", "");
    const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  };

  LL.formatNumber = function (value, decimals = 0) {
    return Number(value).toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  /* ---------- Shared render helpers ---------- */
  LL.render = {
    projectCard(p, opts = {}) {
      const tag = opts.headingTag || "h3";
      return `
        <a class="pcard" href="project.html#${p.slug}" data-categories="${p.categories.join(",")}">
          <div class="pcard-media" style="--p1:${p.palette[0].hex}">
            <img src="${p.cover}" alt="${LL.escape(p.name)} brand artwork" loading="lazy" width="1200" height="900">
          </div>
          <div class="pcard-meta">
            <span class="label">${LL.escape(p.client)} · ${p.year}</span>
            <span class="label">${p.categories.join(" / ")}</span>
          </div>
          <${tag} class="pcard-title">${LL.escape(p.name)}</${tag}>
          ${opts.summary === false ? "" : `<p class="pcard-sum">${LL.escape(p.summary)}</p>`}
        </a>`;
    },
    avatar(person, i) {
      return `<span class="avatar shape-${i % 4}" style="--tone:${person.tone}" role="img" aria-label="${LL.escape(person.name)}"><span aria-hidden="true">${LL.escape(person.initials)}</span></span>`;
    }
  };

  /* ---------- Copy-to-clipboard buttons ---------- */
  LL.bindCopy = function (ctx = document) {
    LL.qsa("[data-copy]", ctx).forEach((btn) => {
      if (btn.dataset.copyBound) return;
      btn.dataset.copyBound = "1";
      const original = btn.textContent;
      btn.addEventListener("click", () => {
        const text = btn.dataset.copy;
        const done = (msg) => { btn.textContent = msg; setTimeout(() => (btn.textContent = original), 1800); };
        const fallback = () => {
          const target = btn.parentElement.querySelector("[data-copy-text]");
          if (target) {
            const range = document.createRange();
            range.selectNodeContents(target);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          }
          done("Selected");
        };
        try {
          navigator.clipboard.writeText(text).then(() => done("Copied"), fallback);
        } catch (e) { fallback(); }
      });
    });
  };
})(window.LL);
