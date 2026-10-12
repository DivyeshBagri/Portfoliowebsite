/* ==========================================================================
   Scroll reveals — declarative animation hooks used across all pages.

   data-split            headline words slide up from a mask
   data-reveal           element rises and fades in (data-delay optional)
   data-reveal-stagger   children rise in sequence
   data-count="120"      number counts up (markup holds the final value)
   data-scrub-words      words brighten as you scroll through the paragraph
   data-parallax="8"     element drifts vertically while in view
   ========================================================================== */
window.LL = window.LL || {};

LL.reveal = {
  init(scope = document) {
    if (!LL.motion) return;

    LL.qsa("[data-split]", scope).forEach((el) => {
      const words = LL.splitWords(el);
      gsap.from(words, {
        yPercent: 115,
        duration: 1.15,
        stagger: 0.045,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });

    LL.qsa("[data-reveal]", scope).forEach((el) => {
      gsap.from(el, {
        y: 48,
        opacity: 0,
        duration: 1.1,
        delay: parseFloat(el.dataset.delay || 0),
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true }
      });
    });

    LL.qsa("[data-reveal-stagger]", scope).forEach((group) => {
      gsap.from(group.children, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: group, start: "top 88%", once: true }
      });
    });

    LL.qsa("[data-count]", scope).forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const state = { v: 0 };
      el.textContent = LL.formatNumber(0, decimals);
      ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => gsap.to(state, {
          v: end,
          duration: 2.2,
          ease: "power3.out",
          onUpdate: () => (el.textContent = LL.formatNumber(state.v, decimals))
        })
      });
    });

    LL.qsa("[data-scrub-words]", scope).forEach((el) => {
      const words = LL.splitWords(el);
      gsap.fromTo(words, { opacity: 0.16 }, {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 50%", scrub: true }
      });
    });

    LL.qsa("[data-parallax]", scope).forEach((el) => {
      const amount = parseFloat(el.dataset.parallax) || 8;
      gsap.fromTo(el, { yPercent: -amount }, {
        yPercent: amount,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
  }
};
