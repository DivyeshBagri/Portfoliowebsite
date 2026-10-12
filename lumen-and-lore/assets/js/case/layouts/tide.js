/* ==========================================================================
   Layout: TIDE — Tide & Timber
   One pinned scene tells the whole story as a single day. As you scroll,
   the sky moves from sunrise to night, the sun travels its arc, and each
   time of day reveals the next chapter.
   ========================================================================== */
window.LL = window.LL || {};
LL.layouts = LL.layouts || {};

LL.layouts.tide = {
  render(p, s) {
    const e = LL.escape;
    const first = s.moments[0].sky;
    return `
      <section class="tide-hero">
        <div class="container">
          ${LL.case.crumbs(p)}
          <p class="label case-kicker">${e(s.kicker)}</p>
          <h1 class="case-title" data-split>${e(p.name)}</h1>
          <p class="case-headline" data-reveal>${e(s.headline)}</p>
        </div>
        <div class="container">
          <figure class="tide-panorama" data-unmask><img src="${p.cover}" alt="${e(p.name)} identity artwork" width="1200" height="900" data-parallax="6"></figure>
          ${LL.case.facts(p)}
        </div>
      </section>

      <section class="tide-day" data-tide aria-label="A day at the hotel">
        <div class="tide-panel" style="--sky-top:${first[0]};--sky-bottom:${first[1]}">
          <svg class="tide-arc" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
            <path class="tide-arc-path" d="M60 400 A 440 360 0 0 1 940 400"/>
            <circle class="tide-sun" r="34" cx="60" cy="400"/>
          </svg>
          <svg class="tide-sea" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 40 Q 150 20 300 40 T 600 40 T 900 40 T 1200 40 V120 H0 Z"/>
            <path class="tide-sea-line" d="M0 70 Q 150 55 300 70 T 600 70 T 900 70 T 1200 70"/>
          </svg>
          <div class="container tide-copy">
            <ol class="tide-clock" aria-hidden="true">
              ${s.moments.map((m, i) => `<li class="${i === 0 ? "is-active" : ""}">${e(m.time)}</li>`).join("")}
            </ol>
            ${s.moments.map((m, i) => `
              <article class="tide-moment ${i === 0 ? "is-active" : ""}" style="--sky-top:${m.sky[0]};--sky-bottom:${m.sky[1]}">
                <p class="tide-time">${e(m.time)} <span class="label">${e(m.label)}</span></p>
                <h3>${e(m.title)}</h3>
                <p>${e(m.text)}</p>
              </article>`).join("")}
          </div>
        </div>
      </section>

      ${LL.case.identity(p, "Colours of a Goan day")}
      ${LL.case.results(p, "After the season")}`;
  },

  init(root, p, s) {
    const section = LL.qs("[data-tide]", root);
    if (!section || !LL.motion) return;

    const panel = LL.qs(".tide-panel", section);
    const moments = LL.qsa(".tide-moment", section);
    const clock = LL.qsa(".tide-clock li", section);
    const arc = LL.qs(".tide-arc-path", section);
    const sun = LL.qs(".tide-sun", section);
    const arcLen = arc.getTotalLength();
    const tops = s.moments.map((m) => m.sky[0]);
    const bottoms = s.moments.map((m) => m.sky[1]);
    const topAt = gsap.utils.interpolate(tops);
    const bottomAt = gsap.utils.interpolate(bottoms);

    section.classList.add("is-pinned");
    let current = 0;

    const update = (prog) => {
      panel.style.setProperty("--sky-top", topAt(prog));
      panel.style.setProperty("--sky-bottom", bottomAt(prog));
      const pt = arc.getPointAtLength(arcLen * Math.min(prog / 0.85, 1));
      sun.setAttribute("cx", pt.x);
      sun.setAttribute("cy", pt.y);
      const night = prog > 0.8;
      panel.classList.toggle("is-night", night);
      const idx = Math.min(moments.length - 1, Math.floor(prog * moments.length));
      if (idx !== current) {
        current = idx;
        moments.forEach((m, i) => m.classList.toggle("is-active", i === idx));
        clock.forEach((c, i) => c.classList.toggle("is-active", i === idx));
      }
    };

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => "+=" + window.innerHeight * (moments.length + 0.5),
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => update(self.progress)
    });
    update(0);
  }
};
