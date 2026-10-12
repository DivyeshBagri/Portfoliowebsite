/* ==========================================================================
   Layout: FRAMES — Volt
   Opens loud: a jagged sound wave and a dB meter at 92. As you scroll, the
   wave flattens and the meter falls to 0, the campaign's promise of silence.
   Then the billboards slide past like frames of film.
   ========================================================================== */
window.LL = window.LL || {};
LL.layouts = LL.layouts || {};

LL.layouts.frames = {
  scooter: `
    <svg class="frame-scooter" viewBox="0 0 120 70" aria-hidden="true">
      <circle cx="22" cy="54" r="12" fill="none" stroke="currentColor" stroke-width="3"/>
      <circle cx="96" cy="54" r="12" fill="none" stroke="currentColor" stroke-width="3"/>
      <path d="M22 54 h30 l12 -18 h22 l10 18 M86 36 l-8 -26 h-10 M30 40 h26" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

  render(p, s) {
    const e = LL.escape;
    return `
      <section class="frames-hero">
        <div class="container">
          ${LL.case.crumbs(p)}
          <p class="label case-kicker">${e(s.kicker)}</p>
          <h1 class="frames-title" data-split>${e(p.name)}</h1>
          <p class="case-headline" data-reveal>${e(s.headline)}</p>
        </div>
        <div class="frames-wave" data-wave>
          <svg viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true"><path data-wave-path/></svg>
          <div class="container frames-meter">
            <span class="label">Street noise</span>
            <span class="frames-db"><span data-db>92</span> dB</span>
            <span class="label">Scroll to turn it down</span>
          </div>
        </div>
        <div class="container">${LL.case.facts(p, "case-facts--light")}</div>
      </section>

      <section class="section frames-statements" aria-label="The story">
        <div class="container">
          ${s.statements.map((st) => `
            <div class="frames-statement">
              <p class="label">${e(st.label)}</p>
              <p class="frames-statement-text" data-scrub-words>${e(st.text)}</p>
            </div>`).join("")}
        </div>
      </section>

      <section class="frames-reel" data-frames aria-label="The campaign">
        <div class="frames-track">
          <div class="frames-intro">
            <p class="label">The campaign</p>
            <h2 class="section-title" data-split>Billboards that whisper</h2>
            <p class="lead">Ninety percent empty space. One small scooter. One quiet line.</p>
          </div>
          ${s.frames.map((f, i) => `
            <figure class="frame">
              <div class="frame-board">
                <span class="frame-line">${e(f.line)}</span>
                ${this.scooter}
                <span class="frame-logo">VOLT</span>
              </div>
              <figcaption><span class="label">Frame ${String(i + 1).padStart(2, "0")}</span><span class="label">${e(f.place)}</span></figcaption>
            </figure>`).join("")}
        </div>
      </section>

      <section class="section frames-outcome">
        <div class="container">
          <p class="label">The outcome</p>
          <p class="frames-outcome-text" data-reveal>${e(s.outcome)}</p>
        </div>
      </section>

      ${LL.case.results(p, "Loud results")}
      ${LL.case.identity(p, "Built for motion")}`;
  },

  init(root) {
    this.wave(root);
    this.reel(root);
  },

  /* A wave whose amplitude follows scroll: 1 at the top, 0 once scrolled past. */
  wave(root) {
    const wrap = LL.qs("[data-wave]", root);
    const path = LL.qs("[data-wave-path]", root);
    const db = LL.qs("[data-db]", root);
    if (!wrap || !path) return;

    const points = 120;
    const seeds = Array.from({ length: points }, (_, i) => Math.sin(i * 1.7) * 0.5 + Math.sin(i * 0.37) * 0.35 + (Math.random() - 0.5) * 0.6);
    let amp = 1, t = 0;

    const draw = () => {
      let d = "M0 120";
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * 1200;
        const jitter = LL.reduced ? 0 : Math.sin(t * 6 + i) * 0.25;
        const y = 120 + (seeds[i % points] + jitter) * 100 * amp;
        d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      path.setAttribute("d", d);
    };
    draw();
    if (!LL.motion) return;

    ScrollTrigger.create({
      trigger: wrap,
      start: "top 70%",
      end: "bottom 15%",
      scrub: true,
      onUpdate: (self) => {
        amp = Math.max(0, 1 - self.progress);
        db.textContent = Math.round(92 * amp);
      }
    });

    let visible = true;
    new IntersectionObserver(([en]) => (visible = en.isIntersecting)).observe(wrap);
    const loop = () => { if (visible) { t += 0.016; draw(); } requestAnimationFrame(loop); };
    loop();
  },

  reel(root) {
    const section = LL.qs("[data-frames]", root);
    if (!section || !LL.motion) return;
    const track = LL.qs(".frames-track", section);
    gsap.matchMedia().add("(min-width: 900px)", () => {
      section.classList.add("is-pinned");
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: () => "+=" + distance(), pin: true, scrub: 1, invalidateOnRefresh: true }
      });
      LL.qsa(".frame-scooter", track).forEach((sc) => {
        gsap.fromTo(sc, { xPercent: 120 }, {
          xPercent: -60, ease: "none",
          scrollTrigger: { trigger: sc.closest(".frame"), containerAnimation: tween, start: "left right", end: "right left", scrub: true }
        });
      });
      return () => { section.classList.remove("is-pinned"); gsap.set(track, { clearProps: "transform" }); };
    });
  }
};
