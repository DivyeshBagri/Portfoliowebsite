/* ==========================================================================
   Magnetic buttons — [data-magnetic] elements lean toward the pointer and
   spring back when it leaves.
   ========================================================================== */
window.LL = window.LL || {};

LL.magnetic = {
  bind(ctx = document) {
    if (!LL.motion || !LL.finePointer) return;
    LL.qsa("[data-magnetic]", ctx).forEach((el) => {
      if (el.dataset.magBound) return;
      el.dataset.magBound = "1";
      const inner = el.querySelector(":scope > span");
      const strength = parseFloat(el.dataset.magnetic) || 0.2;

      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        gsap.to(el, { x: x * strength, y: y * strength, duration: 0.6, ease: "power3.out" });
        if (inner) gsap.to(inner, { x: x * strength * 0.4, y: y * strength * 0.4, duration: 0.6, ease: "power3.out" });
      });

      el.addEventListener("pointerleave", () => {
        gsap.to([el, inner].filter(Boolean), { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.4)" });
      });
    });
  }
};
