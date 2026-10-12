/* ==========================================================================
   Smooth scroll — Lenis inertia scrolling synced with GSAP ScrollTrigger.
   Falls back to native scrolling when motion is reduced or Lenis is absent.
   ========================================================================== */
window.LL = window.LL || {};

LL.scroll = {
  lenis: null,

  init() {
    if (LL.motion && window.Lenis) {
      const lenis = new window.Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      this.lenis = lenis;
    }

    // In-page anchors
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      e.preventDefault();
      if (id === "#" || id === "#top") { this.to(0); return; }
      const target = document.querySelector(id);
      if (target) this.to(target);
    });

    LL.qsa("[data-to-top]").forEach((btn) => btn.addEventListener("click", () => this.to(0)));
  },

  to(target) {
    const isNum = typeof target === "number";
    if (this.lenis) {
      this.lenis.scrollTo(target, { offset: isNum ? 0 : -60, duration: 1.4 });
      return;
    }
    const behavior = LL.reduced ? "auto" : "smooth";
    if (isNum) window.scrollTo({ top: target, behavior });
    else target.scrollIntoView({ behavior });
  },

  stop() { if (this.lenis) this.lenis.stop(); },
  start() { if (this.lenis) this.lenis.start(); }
};
