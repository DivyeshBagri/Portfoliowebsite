/* ==========================================================================
   Layout: LOOM — Saanjh
   A loom sits beside the story. As you read each stage, new rows of weft
   are woven in a new colour, and the hour counter climbs from 1 to 62.
   Ends with the weaver's hang tag that ships with every piece.
   ========================================================================== */
window.LL = window.LL || {};
LL.layouts = LL.layouts || {};

LL.layouts.loom = {
  rows: 44,

  loomSvg(c) {
    const W = 300, H = 380, top = 40, bottom = 350;
    const warp = Array.from({ length: 25 }, (_, i) => {
      const x = 30 + i * 10;
      return `<line x1="${x}" y1="${top - 14}" x2="${x}" y2="${bottom + 14}" class="loom-warp"/>`;
    }).join("");
    const bands = [c[1], c[0], c[3], c[1]];
    const step = (bottom - top) / this.rows;
    const weft = Array.from({ length: this.rows }, (_, i) => {
      const y = (top + i * step + step / 2).toFixed(1);
      const color = bands[Math.floor((i / this.rows) * 4)];
      const d = i % 2 ? `M270 ${y} H30` : `M30 ${y} H270`;
      return `<path class="loom-weft" d="${d}" stroke="${color}"/>`;
    }).join("");
    return `
      <svg class="loom-svg" viewBox="0 0 ${W} ${H}" aria-hidden="true">
        <rect x="18" y="18" width="264" height="10" rx="5" class="loom-beam"/>
        <rect x="18" y="352" width="264" height="10" rx="5" class="loom-beam"/>
        ${warp}
        <g>${weft}</g>
      </svg>`;
  },

  render(p, s) {
    const e = LL.escape;
    const c = p.palette.map((x) => x.hex);
    return `
      <section class="loom-hero">
        <div class="loom-hero-weave" aria-hidden="true"></div>
        <div class="container loom-hero-inner">
          ${LL.case.crumbs(p)}
          <p class="label case-kicker">${e(s.kicker)}</p>
          <h1 class="loom-title" data-split>${e(p.name.toLowerCase())}</h1>
          <p class="case-headline" data-reveal>${e(s.headline)}</p>
        </div>
      </section>

      <div class="container">
        <figure class="loom-cover" data-unmask><img src="${p.cover}" alt="${e(p.name)} identity artwork" width="1200" height="900" data-parallax="5"></figure>
        ${LL.case.facts(p)}
      </div>

      <section class="section loom-story" data-loom aria-label="The story">
        <div class="container loom-grid">
          <div class="loom-stage">
            <div class="loom-frame">
              ${this.loomSvg(c)}
              <div class="loom-readout">
                <span class="label">On the loom</span>
                <span class="loom-hours"><span data-loom-hour>1</span> hrs</span>
              </div>
            </div>
          </div>
          <div class="loom-steps">
            ${s.steps.map((st, i) => `
              <article class="loom-step" data-step="${i}">
                <p class="loom-step-meta"><span class="loom-swatch" style="background:${[c[1], c[0], c[3], c[1]][i]}"></span><span class="label">${e(st.hour)} · ${e(st.stage)}</span></p>
                <h3 data-split>${e(st.title)}</h3>
                <p data-reveal>${e(st.text)}</p>
              </article>`).join("")}
          </div>
        </div>
      </section>

      <section class="section band loom-tag-section" aria-label="The weaver tag">
        <div class="container loom-tag-grid">
          <div class="loom-tag-wrap">
            <svg class="loom-string" viewBox="0 0 40 120" aria-hidden="true"><path data-draw="once" d="M20 0 C 4 40, 36 70, 20 118"/></svg>
            <div class="loom-tag">
              <span class="loom-tag-hole" aria-hidden="true"></span>
              <p class="loom-tag-brand">saanjh</p>
              <p class="label">Woven by</p>
              <p class="loom-tag-name">${e(s.tag.weaver)}</p>
              <p class="loom-tag-line">${e(s.tag.village)}</p>
              <div class="loom-tag-hours"><span data-count="${s.tag.hours}">${s.tag.hours}</span><span class="label">hours on the loom</span></div>
              <p class="loom-tag-line">${e(s.tag.piece)}</p>
            </div>
          </div>
          <div>
            <p class="label">The detail that sold it</p>
            <h2 class="section-title" data-split>Every piece carries the name of the hands that made it</h2>
            <p class="lead" data-reveal>The tag is printed on offcut cotton from the same loom. Customers photograph it more than the saree.</p>
          </div>
        </div>
      </section>

      ${LL.case.identity(p, "Colours from the dye pot")}
      ${LL.case.results(p, "What the loom made")}`;
  },

  init(root, p, s) {
    const section = LL.qs("[data-loom]", root);
    const wefts = LL.qsa(".loom-weft", root);
    const hour = LL.qs("[data-loom-hour]", root);
    const steps = LL.qsa(".loom-step", root);
    if (!section) return;

    const lengths = wefts.map((w) => w.getTotalLength());
    const paint = (progress) => {
      const rowsDone = progress * this.rows;
      wefts.forEach((w, i) => {
        const f = Math.min(1, Math.max(0, rowsDone - i));
        w.style.strokeDasharray = lengths[i];
        w.style.strokeDashoffset = lengths[i] * (1 - f);
      });
      hour.textContent = Math.max(1, Math.round(progress * s.tag.hours));
    };

    if (!LL.motion) { paint(1); steps.forEach((st) => st.classList.add("is-active")); return; }
    paint(0);

    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 70%",
      scrub: 0.4,
      onUpdate: (self) => paint(self.progress)
    });
    steps.forEach((st) => {
      ScrollTrigger.create({ trigger: st, start: "top 60%", end: "bottom 40%", toggleClass: { targets: st, className: "is-active" } });
    });
  }
};
