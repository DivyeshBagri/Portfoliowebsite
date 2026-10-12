/* ==========================================================================
   Boot — wires up shared modules, renders the current page, then starts
   animations once the brand intro (first visit only) has finished.
   ========================================================================== */
(function () {
  const LL = window.LL;
  const pageEl = LL.qs("[data-page]");
  const page = pageEl ? pageEl.dataset.page : "";
  const mod = LL.pages[page];

  if (LL.hasGsap) gsap.registerPlugin(ScrollTrigger);
  if (!LL.motion) document.documentElement.classList.remove("is-loading");

  LL.theme.init();
  LL.scroll.init();
  LL.nav.init();

  if (mod && mod.render) mod.render();
  LL.bindCopy();

  LL.intro.run().then(() => {
    LL.reveal.init();
    if (mod && mod.init) mod.init();
    LL.magnetic.bind();
    if (LL.hasGsap) {
      // Fonts change line lengths; recalculate trigger positions once they land.
      ScrollTrigger.refresh();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
      window.addEventListener("load", () => ScrollTrigger.refresh());
    }
  });
})();
