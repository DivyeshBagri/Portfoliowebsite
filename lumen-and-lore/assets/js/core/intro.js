/* ==========================================================================
   Brand intro — plays once per browser session, on whichever page the
   visitor lands on first.

   1. "Lumen & Lore" rises in letter by letter in the centre of the screen
      while the logo mark draws itself.
   2. The whole lockup shrinks and glides into the header, landing exactly
      on top of the real header logo.
   3. The cover fades away and the page underneath starts its own animations.

   The <head> script adds .is-loading to <html> when the intro should play,
   so returning visitors never see a flash of it.
   ========================================================================== */
window.LL = window.LL || {};

LL.intro = {
  run() {
    return new Promise((resolve) => {
      const html = document.documentElement;
      const el = LL.qs("[data-intro]");
      const target = LL.qs(".site-header .brand");

      const finish = () => {
        html.classList.remove("is-loading");
        if (el) el.remove();
      };

      if (!el || !target || !html.classList.contains("is-loading") || !LL.motion) {
        finish();
        resolve();
        return;
      }

      LL.session.set("ll-intro", "1");
      LL.scroll.stop();

      const brand = LL.qs("[data-intro-brand]", el);
      const cover = LL.qs(".intro-cover", el);
      const chars = LL.qsa(".intro-word [data-chars]", el).flatMap((word) => LL.splitChars(word));
      const amp = LL.qs(".intro-word i", el);
      const strokes = LL.qsa(".intro-mark circle:not(.glow), .intro-mark path", el);
      const glow = LL.qs(".intro-mark .glow", el);

      strokes.forEach((s) => {
        const len = s.getTotalLength();
        gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
      });

      // Where the lockup has to travel to, measured just before it moves.
      const move = { x: 0, y: 0, scale: 1 };
      const measure = () => {
        const from = brand.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        move.scale = to.width / from.width;
        move.x = to.left - from.left;
        move.y = to.top - from.top;
      };

      gsap.timeline({
        onComplete: () => {
          finish();
          LL.scroll.start();
        }
      })
        .from(chars, { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.035, ease: "expo.out" }, 0.15)
        .from(amp, { scale: 0.4, opacity: 0, duration: 0.8, ease: "back.out(2)" }, 0.45)
        .to(strokes, { strokeDashoffset: 0, duration: 1.1, stagger: 0.08, ease: "power2.inOut" }, 0.1)
        .from(glow, { scale: 0, transformOrigin: "50% 50%", duration: 0.7, ease: "back.out(2.5)" }, 0.85)
        .call(measure, null, "+=0.35")
        .to(brand, {
          x: () => move.x,
          y: () => move.y,
          scale: () => move.scale,
          duration: 1.1,
          ease: "expo.inOut"
        })
        .to(cover, { opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.55")
        .add(resolve, "-=0.5");
    });
  }
};
