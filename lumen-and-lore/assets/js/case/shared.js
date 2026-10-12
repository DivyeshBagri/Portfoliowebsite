/* ==========================================================================
   Case study — shared building blocks used by every layout:
   breadcrumbs, project facts, identity kit, results, quote, next project,
   plus two animation helpers:

   data-draw="scrub"   SVG stroke draws as you scroll through its trigger
   data-draw="once"    SVG stroke draws once when it enters the screen
   data-unmask         block is revealed by a wiping clip mask
   ========================================================================== */
window.LL = window.LL || {};
LL.layouts = LL.layouts || {};

LL.case = {
  vars(p) {
    const c = p.palette.map((x) => x.hex);
    return `--p1:${c[0]};--p2:${c[1]};--p3:${c[2]};--p4:${c[3]}`;
  },

  crumbs(p) {
    return `<nav class="case-crumbs label" aria-label="Breadcrumb"><a href="work.html">Work</a><span aria-hidden="true">/</span><span>${LL.escape(p.name)}</span></nav>`;
  },

  facts(p, cls = "") {
    const e = LL.escape;
    return `
      <dl class="case-facts ${cls}" data-reveal-stagger>
        <div><dt class="label">Client</dt><dd>${e(p.client)}</dd></div>
        <div><dt class="label">Sector</dt><dd>${e(p.sector)}</dd></div>
        <div><dt class="label">Year · City</dt><dd>${p.year} · ${e(p.location)}</dd></div>
        <div><dt class="label">What we did</dt><dd>${p.services.map(e).join(", ")}</dd></div>
      </dl>`;
  },

  identity(p, title = "The identity kit") {
    const e = LL.escape;
    return `
      <section class="section case-identity" aria-label="${e(title)}">
        <div class="container">
          <div class="case-head">
            <h2 class="section-title" data-split>${e(title)}</h2>
            <p class="lead" data-reveal>Four colours and two typefaces carry the whole brand.</p>
          </div>
          <div class="swatches" data-reveal-stagger>
            ${p.palette.map((c) => `
              <div class="swatch" style="background:${c.hex};color:${LL.textOn(c.hex)}">
                <span class="swatch-name">${e(c.name)}</span>
                <span class="swatch-codes"><span>HEX ${c.hex.toUpperCase()}</span><span>RGB ${LL.hexToRgb(c.hex).join(" ")}</span></span>
              </div>`).join("")}
          </div>
          <div class="type-specs" data-reveal-stagger>
            ${p.type.map((t) => `
              <div class="type-spec">
                <span class="label">${e(t.role)}</span>
                <span class="glyphs" style="font-family:${t.css}">Aa</span>
                <h3>${e(t.name)}</h3>
                <p class="alphabet" style="font-family:${t.css}">ABCDEFGHIJKLM nopqrstuvwxyz 0123456789</p>
                <p class="label">${e(t.note)}</p>
              </div>`).join("")}
          </div>
        </div>
      </section>`;
  },

  results(p, title = "What changed") {
    const e = LL.escape;
    return `
      <section class="section case-results" aria-label="Results">
        <div class="container">
          <div class="case-head"><h2 class="section-title" data-split>${e(title)}</h2></div>
          <div class="results">
            ${p.results.map((r) => {
              const dec = r.decimals || 0;
              return `<div class="result">
                <p class="result-value">${r.prefix ? `<span class="unit">${e(r.prefix)}</span>` : ""}<span data-count="${r.value}" data-decimals="${dec}">${LL.formatNumber(r.value, dec)}</span><span class="unit">${e(r.unit)}</span></p>
                <p>${e(r.label)}</p>
              </div>`;
            }).join("")}
          </div>
        </div>
      </section>`;
  },

  quote(p) {
    const e = LL.escape;
    return `
      <section class="section case-quote">
        <div class="container">
          <figure data-reveal>
            <svg class="case-quote-line" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true"><path data-draw="once" d="M2 10 C 80 2, 160 18, 240 10 S 360 4, 398 10"/></svg>
            <blockquote>“${e(p.quote.text)}”</blockquote>
            <figcaption><strong>${e(p.quote.name)}</strong> · ${e(p.quote.role)}</figcaption>
          </figure>
        </div>
      </section>`;
  },

  next(p) {
    const i = LL.projects.indexOf(p);
    const n = LL.projects[(i + 1) % LL.projects.length];
    const story = LL.caseStories[n.slug] || {};
    return `
      <section class="section--tight case-next">
        <div class="container">
          <a class="next-proj" href="project.html#${n.slug}">
            <span class="label">Next story · ${LL.escape(story.kicker || n.categories[0])}</span>
            <span class="next-proj-row">
              <span class="next-proj-title">${LL.escape(n.name)}</span>
              <span class="next-proj-thumb"><img src="${n.cover}" alt="" width="1200" height="900" loading="lazy"></span>
            </span>
          </a>
        </div>
      </section>`;
  },

  /* ---------- Animation helpers ---------- */
  prepareStroke(path) {
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    return len;
  },

  animate(root) {
    if (!LL.motion) return;

    LL.qsa('[data-draw="scrub"]', root).forEach((path) => {
      this.prepareStroke(path);
      const trigger = path.closest("[data-draw-trigger]") || path.closest("svg");
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: { trigger, start: path.dataset.start || "top 70%", end: path.dataset.end || "bottom 60%", scrub: 0.6 }
      });
    });

    LL.qsa('[data-draw="once"]', root).forEach((path) => {
      this.prepareStroke(path);
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: parseFloat(path.dataset.duration || 1.6),
        ease: "power2.inOut",
        scrollTrigger: { trigger: path.closest("svg"), start: "top 85%", once: true }
      });
    });

    LL.qsa("[data-unmask]", root).forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: { trigger: el, start: "top 85%", once: true }
      });
    });
  }
};
