/* ==========================================================================
   Layout: INGREDIENTS — Kora
   Told like a pharmacy label: hairline rules, a formula sheet instead of
   chapters, and a before/after slider comparing the "miracle" packaging
   category with Kora's honest bottle.
   ========================================================================== */
window.LL = window.LL || {};
LL.layouts = LL.layouts || {};

LL.layouts.ingredients = {
  render(p, s) {
    const e = LL.escape;
    const pct = [72, 14, 5, 6, 3];
    return `
      <section class="ing-hero">
        <div class="container ing-hero-grid">
          <div>
            ${LL.case.crumbs(p)}
            <p class="label case-kicker">${e(s.kicker)}</p>
            <h1 class="ing-title" data-split>${e(p.name.toLowerCase())}</h1>
            <p class="ing-headline" data-reveal>${e(s.headline)}</p>
          </div>
          <div class="ing-label" data-reveal>
            <svg class="ing-label-border" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><rect data-draw="once" data-duration="2" x="0.5" y="0.5" width="99" height="99" rx="2"/></svg>
            <p class="ing-label-head"><span>INGREDIENTS</span><span>% w/w</span></p>
            <ul>
              ${s.after.list.map((name, i) => `
                <li><span>${e(name)}</span><span class="ing-bar"><i style="--w:${pct[i]}%"></i></span><span class="tabular">${pct[i]}</span></li>`).join("")}
            </ul>
            <p class="ing-label-foot"><span>Batch KR-0923</span><span>Fragrance free · 30 ml</span></p>
          </div>
        </div>
        <div class="container">${LL.case.facts(p)}</div>
      </section>

      <section class="section ing-formula" aria-label="The formula">
        <div class="container">
          <div class="case-head">
            <h2 class="section-title" data-split>The formula behind the brand</h2>
            <p class="lead" data-reveal>Four parts, measured and listed. Nothing hidden in the small print.</p>
          </div>
          <div class="ing-rows">
            ${s.formula.map((f) => `
              <article class="ing-row">
                <span class="ing-rule" aria-hidden="true"></span>
                <span class="ing-n">${e(f.n)}</span>
                <h3>${e(f.name)}</h3>
                <p class="ing-amount">${e(f.amount)}</p>
                <p class="ing-text" data-reveal>${e(f.text)}</p>
              </article>`).join("")}
          </div>
        </div>
      </section>

      <section class="section band ing-compare-section" aria-label="Before and after">
        <div class="container">
          <div class="case-head">
            <h2 class="section-title" data-split>The category versus Kora</h2>
            <p class="lead" data-reveal>Drag the handle. On the left, how skincare usually sells. On the right, the bottle we designed.</p>
          </div>
          <div class="ing-compare" data-compare style="--split:50%">
            <div class="ing-side ing-before">
              <div class="ing-bottle is-glossy">
                <span class="ing-cap"></span>
                <span class="ing-b-title">${e(s.before.title)}</span>
                <span class="ing-b-line">${e(s.before.line)}</span>
                <span class="ing-b-small">${e(s.before.small)}</span>
              </div>
              <span class="label ing-side-label">Before: the category</span>
            </div>
            <div class="ing-side ing-after">
              <div class="ing-bottle is-honest">
                <span class="ing-cap"></span>
                <ul class="ing-b-list">${s.after.list.map((x) => `<li>${e(x)}</li>`).join("")}</ul>
                <span class="ing-b-brand">${e(s.after.title)}</span>
              </div>
              <span class="label ing-side-label">After: Kora</span>
            </div>
            <span class="ing-handle" aria-hidden="true"><i></i></span>
            <label class="sr-only" for="compare-range">Compare before and after</label>
            <input class="ing-range" id="compare-range" type="range" min="0" max="100" value="50">
          </div>
        </div>
      </section>

      ${LL.case.identity(p, "A clinical palette, softened")}
      ${LL.case.results(p, "Measured results")}`;
  },

  init(root) {
    const compare = LL.qs("[data-compare]", root);
    if (compare) {
      const range = LL.qs(".ing-range", compare);
      const set = (v) => compare.style.setProperty("--split", `${v}%`);
      range.addEventListener("input", () => set(range.value));
      if (LL.motion) {
        const o = { v: 50 };
        gsap.timeline({ scrollTrigger: { trigger: compare, start: "top 70%", once: true } })
          .to(o, { v: 22, duration: 0.9, ease: "power2.inOut", onUpdate: () => { set(o.v); range.value = o.v; } })
          .to(o, { v: 72, duration: 1.1, ease: "power2.inOut", onUpdate: () => { set(o.v); range.value = o.v; } })
          .to(o, { v: 50, duration: 0.8, ease: "power2.inOut", onUpdate: () => { set(o.v); range.value = o.v; } });
      }
    }

    if (!LL.motion) return;
    LL.qsa(".ing-bar i", root).forEach((bar, i) => {
      gsap.from(bar, { scaleX: 0, duration: 1.2, delay: 0.6 + i * 0.1, ease: "expo.out" });
    });
    LL.qsa(".ing-rule", root).forEach((rule) => {
      gsap.from(rule, { scaleX: 0, duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: rule, start: "top 85%", once: true } });
    });
  }
};
