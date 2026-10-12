/* ==========================================================================
   Layout: ROUTE — Nomad
   The story is a flight: four boarding passes (BOM → DXB → IST → LIS) joined
   by a dotted route. A plane travels the route as you scroll, and the line
   behind it turns solid. The coral card tilts toward the pointer.
   ========================================================================== */
window.LL = window.LL || {};
LL.layouts = LL.layouts || {};

LL.layouts.route = {
  render(p, s) {
    const e = LL.escape;
    return `
      <section class="route-hero">
        <div class="container route-hero-grid">
          <div>
            ${LL.case.crumbs(p)}
            <p class="label case-kicker">${e(s.kicker)}</p>
            <h1 class="case-title" data-split>${e(p.name)}</h1>
            <p class="case-headline" data-reveal>${e(s.headline)}</p>
          </div>
          <div class="route-card-stage" data-tilt>
            <div class="route-card">
              <div class="route-card-top"><span class="route-card-brand">nomad</span><span class="route-card-chip"></span></div>
              <svg class="route-card-path" viewBox="0 0 300 80" aria-hidden="true"><path d="M8 70 Q 150 -20 292 50"/><circle cx="8" cy="70" r="5"/><circle cx="292" cy="50" r="5"/></svg>
              <div class="route-card-bottom"><span>•••• 4021</span><span>BOM → LIS</span></div>
            </div>
          </div>
        </div>
        <div class="container">${LL.case.facts(p)}</div>
      </section>

      <section class="section route-journey" data-route aria-label="The journey">
        <div class="container">
          <div class="case-head">
            <h2 class="section-title" data-split>Four stops from bank to passport</h2>
            <p class="lead" data-reveal>Every chapter of the project is a leg of the trip.</p>
          </div>
          <div class="route-map">
            <svg class="route-svg" aria-hidden="true">
              <path class="route-dots"/>
              <path class="route-solid"/>
              <g class="route-plane"><circle r="18"/><path d="M-9 1 L9 -1 M2 -8 L6 0 L2 8 M-7 -4 L-5 0 L-7 4" /></g>
            </svg>
            ${s.stops.map((st, i) => `
              <article class="route-stop ${i % 2 ? "is-right" : ""}">
                <span class="route-pin" aria-hidden="true"></span>
                <div class="route-pass">
                  <div class="route-pass-head">
                    <span class="route-code">${e(st.code)}</span>
                    <span class="label">${e(st.label)} · ${e(st.city)}</span>
                  </div>
                  <h3>${e(st.title)}</h3>
                  <p>${e(st.text)}</p>
                  <div class="route-pass-foot"><span class="label">Leg ${i + 1} of ${s.stops.length}</span><span class="route-barcode" aria-hidden="true"></span></div>
                </div>
              </article>`).join("")}
          </div>
        </div>
      </section>

      <section class="section band route-app" aria-label="The app">
        <div class="container">
          <div class="case-head">
            <h2 class="section-title" data-split>Every currency switch is a little journey</h2>
            <p class="lead" data-reveal>In the app, your balance travels with you. The route animates from home to wherever you just landed.</p>
          </div>
          <div class="route-phones">
            ${s.screens.map((sc, i) => `
              <div class="route-phone" data-parallax="${[4, -6, 8][i]}">
                <div class="route-phone-screen">
                  <span class="label">Balance · ${e(sc.place)}</span>
                  <span class="route-balance"><small>${e(sc.symbol)}</small> ${e(sc.amount)}</span>
                  <svg viewBox="0 0 200 70" aria-hidden="true"><path data-draw="once" d="M6 62 Q 100 -18 194 40"/><circle cx="6" cy="62" r="4"/><circle cx="194" cy="40" r="4"/></svg>
                  <span class="route-chiprow"><span>INR</span><span aria-hidden="true">→</span><span>${e(sc.currency)}</span></span>
                  <span class="route-btn">Rate locked · 0% markup</span>
                </div>
              </div>`).join("")}
          </div>
        </div>
      </section>

      ${LL.case.identity(p, "Passport colours")}
      ${LL.case.results(p, "Arrivals")}`;
  },

  init(root) {
    this.tilt(root);
    this.route(root);
  },

  tilt(root) {
    const stage = LL.qs("[data-tilt]", root);
    if (!stage || !LL.motion) return;
    const card = LL.qs(".route-card", stage);
    gsap.set(card, { rotateX: 10, rotateY: -16, rotateZ: -4 });
    gsap.from(card, { y: 80, opacity: 0, rotateZ: -14, duration: 1.4, ease: "expo.out", delay: 0.2 });
    if (!LL.finePointer) return;
    stage.addEventListener("pointermove", (ev) => {
      const r = stage.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: x * 30, rotateX: -y * 24, duration: 0.8, ease: "power3.out" });
    });
    stage.addEventListener("pointerleave", () => gsap.to(card, { rotateX: 10, rotateY: -16, duration: 1.2, ease: "elastic.out(1, 0.5)" }));
  },

  /* Build a smooth route through the pins, then move the plane along it. */
  route(root) {
    const map = LL.qs(".route-map", root);
    const svg = LL.qs(".route-svg", root);
    if (!map || !svg) return;
    const dots = LL.qs(".route-dots", svg);
    const solid = LL.qs(".route-solid", svg);
    const plane = LL.qs(".route-plane", svg);
    let len = 0, progress = 0;

    const build = () => {
      const box = map.getBoundingClientRect();
      const pts = LL.qsa(".route-pin", map).map((pin) => {
        const r = pin.getBoundingClientRect();
        return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top];
      });
      svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
      let d = `M${pts[0][0]} ${pts[0][1]}`;
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
        const my = (y0 + y1) / 2;
        d += ` C ${x0} ${my}, ${x1} ${my}, ${x1} ${y1}`;
      }
      dots.setAttribute("d", d);
      solid.setAttribute("d", d);
      len = solid.getTotalLength();
      solid.style.strokeDasharray = len;
      place();
    };

    const place = () => {
      const at = len * progress;
      const pt = solid.getPointAtLength(at);
      const ahead = solid.getPointAtLength(Math.min(len, at + 1));
      const angle = Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180 / Math.PI;
      plane.setAttribute("transform", `translate(${pt.x} ${pt.y}) rotate(${angle})`);
      solid.style.strokeDashoffset = len * (1 - progress);
    };

    build();
    window.addEventListener("resize", build);
    if (document.fonts) document.fonts.ready.then(build);

    if (!LL.motion) { progress = 1; place(); return; }
    ScrollTrigger.create({
      trigger: map,
      start: "top 65%",
      end: "bottom 55%",
      scrub: 0.5,
      onUpdate: (self) => { progress = self.progress; place(); },
      onRefresh: build
    });
    LL.qsa(".route-stop", map).forEach((stop) => {
      ScrollTrigger.create({ trigger: stop, start: "top 62%", toggleClass: { targets: stop, className: "is-reached" } });
    });
  }
};
