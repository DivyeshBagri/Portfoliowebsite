/* ==========================================================================
   Layout: STEM — Brew & Bloom
   A flower stem draws itself down the page as the café's day unfolds,
   from the first cup at 07:00 to closing at 21:00. Each hour is a scene
   with its own line illustration.
   ========================================================================== */
window.LL = window.LL || {};
LL.layouts = LL.layouts || {};

LL.layouts.stem = {
  art(kind, c) {
    const s = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    const petals = (cx, cy, r, len, w, fill) => Array.from({ length: 8 }, (_, i) =>
      `<ellipse cx="${cx}" cy="${cy - r - len / 2}" rx="${w}" ry="${len / 2}" fill="${fill}" transform="rotate(${i * 45} ${cx} ${cy})"/>`).join("");
    const art = {
      cup: `
        <circle cx="120" cy="120" r="92" fill="${c[2]}"/>
        <circle cx="120" cy="120" r="62" fill="#5B3A29"/>
        <circle cx="120" cy="120" r="62" ${s} stroke-dasharray="2 8" opacity=".5"/>
        <path data-draw="once" ${s} d="M196 120 h26 a16 16 0 0 1 0 32 h-16"/>
        <path data-draw="once" ${s} d="M98 30 c-10 -14 10 -18 0 -30 M122 30 c-10 -14 10 -18 0 -30 M146 30 c-10 -14 10 -18 0 -30"/>`,
      eye: `
        <path data-draw="once" ${s} d="M16 120 C 60 50, 180 50, 224 120 C 180 190, 60 190, 16 120 Z"/>
        <circle cx="120" cy="120" r="40" fill="${c[1]}"/>
        <g>${petals(120, 120, 6, 18, 6, c[0])}</g>
        <circle cx="120" cy="120" r="7" fill="${c[3]}"/>
        <path data-draw="once" ${s} d="M40 70 l-14 -16 M120 44 v-22 M200 70 l14 -16"/>`,
      bloom: `
        <g>${petals(120, 120, 46, 64, 22, c[1])}</g>
        <circle cx="120" cy="120" r="52" fill="${c[2]}"/>
        <circle cx="120" cy="120" r="34" fill="#5B3A29"/>
        <circle cx="120" cy="120" r="12" fill="${c[3]}"/>`,
      bag: `
        <path data-draw="once" ${s} d="M88 70 C 88 30, 152 30, 152 70"/>
        <path d="M58 70 h124 l14 150 h-152 z" fill="${c[2]}"/>
        <g>${[[90, 120], [150, 120], [120, 170], [84, 200], [156, 200]].map(([x, y]) => petals(x, y, 2, 12, 4, c[1])).join("")}</g>
        <path data-draw="once" ${s} d="M200 40 c 8 40 -10 80 -2 120 M196 60 q 18 -6 22 -24 M198 96 q -18 -2 -24 -18"/>`,
      moon: `
        <circle cx="120" cy="120" r="96" fill="${c[0]}"/>
        <path d="M150 52 a72 72 0 1 0 0 136 a58 58 0 1 1 0 -136z" fill="${c[2]}"/>
        <g fill="${c[1]}"><circle cx="172" cy="82" r="4"/><circle cx="186" cy="132" r="3"/><circle cx="160" cy="176" r="4"/></g>
        <path data-draw="once" ${s} d="M20 226 h200"/>`
    };
    return `<svg class="stem-art-svg" viewBox="0 0 240 240" aria-hidden="true">${art[kind]}</svg>`;
  },

  render(p, s) {
    const e = LL.escape;
    const c = p.palette.map((x) => x.hex);
    const ring = `${s.kicker} · 07:00 to 21:00 · ${s.kicker} · 07:00 to 21:00 · `;

    return `
      <section class="stem-hero">
        <div class="container stem-hero-grid">
          <div class="stem-hero-text">
            ${LL.case.crumbs(p)}
            <p class="label case-kicker">${e(s.kicker)}</p>
            <h1 class="case-title" data-split>${e(p.name)}</h1>
            <p class="case-headline" data-reveal>${e(s.headline)}</p>
            ${LL.case.facts(p)}
          </div>
          <div class="stem-arch-wrap">
          <figure class="stem-arch" data-unmask>
            <img src="${p.cover}" alt="${e(p.name)} identity artwork" width="1200" height="900" data-parallax="6">
          </figure>
            <svg class="stem-badge" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="stem-ring" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0"/></defs>
              <circle cx="100" cy="100" r="98" fill="${c[1]}"/>
              <text><textPath href="#stem-ring">${e(ring)}</textPath></text>
              <circle cx="100" cy="100" r="22" fill="${c[0]}"/>
            </svg>
          </div>
        </div>
      </section>

      <section class="section stem-day" aria-label="A day at Brew & Bloom">
        <div class="container">
          <div class="case-head">
            <h2 class="section-title" data-split>One day, five moments</h2>
            <p class="lead" data-reveal>We spent a full day in each café before we drew anything. The brand story follows that day.</p>
          </div>
          <div class="stem-track" data-draw-trigger>
            <svg class="stem-line" aria-hidden="true">
              <path class="stem-line-base"/>
              <path class="stem-line-draw" data-draw="scrub" data-start="top 60%" data-end="bottom 70%"/>
            </svg>
            ${s.beats.map((b, i) => `
              <article class="stem-beat ${i % 2 ? "is-right" : ""}">
                <div class="stem-art" data-reveal>${this.art(b.art, c)}</div>
                <span class="stem-node" aria-hidden="true"><i></i></span>
                <div class="stem-text">
                  <p class="stem-time">${e(b.time)}</p>
                  <h3 data-split>${e(b.title)}</h3>
                  <p data-reveal>${e(b.text)}</p>
                </div>
              </article>`).join("")}
          </div>
        </div>
      </section>

      ${LL.case.identity(p, "Petals, cups and colour")}
      ${LL.case.results(p, "After the bloom")}`;
  },

  /* The stem is drawn to the real height of the story so the curve
     never stretches. Called before the draw animation is prepared. */
  buildStem(root) {
    const svg = LL.qs(".stem-line", root);
    if (!svg) return;
    const w = svg.clientWidth || 120;
    const h = svg.clientHeight || 1000;
    const mid = w / 2, amp = w * 0.38, wave = 520;
    let d = `M${mid} 0`;
    for (let y = 0, i = 0; y < h; y += wave, i++) {
      const dir = i % 2 ? -1 : 1;
      d += ` C ${mid + amp * dir} ${y + wave * 0.33}, ${mid + amp * dir} ${y + wave * 0.66}, ${mid} ${Math.min(y + wave, h)}`;
    }
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    LL.qsa("path", svg).forEach((path) => path.setAttribute("d", d));
  },

  init(root) {
    this.buildStem(root);
    if (!LL.motion) return;
    LL.qsa(".stem-node", root).forEach((node) => {
      ScrollTrigger.create({ trigger: node, start: "top 62%", toggleClass: { targets: node.closest(".stem-beat"), className: "is-lit" } });
    });
    const badge = LL.qs(".stem-badge text", root);
    if (badge) gsap.to(badge, { rotation: 360, svgOrigin: "100 100", duration: 30, ease: "none", repeat: -1 });
  }
};
