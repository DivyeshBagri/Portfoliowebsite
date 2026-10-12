/* ==========================================================================
   Navigation — active link, header hide/show on scroll, mobile menu,
   live studio clock in the footer.
   ========================================================================== */
window.LL = window.LL || {};

LL.nav = {
  init() {
    const html = document.documentElement;
    const header = LL.qs("[data-header]");
    const pageEl = LL.qs("[data-page]");
    const page = pageEl ? pageEl.dataset.page : "";

    // Active link
    LL.qsa("[data-nav]").forEach((a) => {
      const match = a.dataset.nav === page || (page === "project" && a.dataset.nav === "work");
      if (match) a.setAttribute("aria-current", "page");
    });

    // Header behaviour
    if (header) {
      let last = window.scrollY;
      const onScroll = () => {
        const y = window.scrollY;
        header.classList.toggle("is-scrolled", y > 20);
        if (!html.classList.contains("menu-open")) {
          header.classList.toggle("is-hidden", y > last && y > 420);
        }
        last = y;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    this.initMenu();
    this.initClock();
  },

  initMenu() {
    const html = document.documentElement;
    const toggle = LL.qs("[data-menu-toggle]");
    const menu = LL.qs("[data-menu]");
    if (!toggle || !menu) return;

    const links = LL.qsa("nav a span", menu);

    const open = () => {
      menu.hidden = false;
      html.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
      LL.scroll.stop();
      if (LL.motion) {
        gsap.fromTo(menu, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" });
        gsap.fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06, ease: "expo.out", delay: 0.25 });
      }
    };

    const close = () => {
      toggle.setAttribute("aria-expanded", "false");
      html.classList.remove("menu-open");
      LL.scroll.start();
      if (LL.motion) {
        gsap.to(menu, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "expo.inOut", onComplete: () => (menu.hidden = true) });
      } else {
        menu.hidden = true;
      }
    };

    toggle.addEventListener("click", () => (menu.hidden ? open() : close()));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) close(); });
    window.addEventListener("resize", () => { if (window.innerWidth > 820 && !menu.hidden) close(); });
  },

  initClock() {
    const clocks = LL.qsa("[data-clock]");
    if (!clocks.length) return;
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false });
    const update = () => clocks.forEach((c) => (c.textContent = `Pune ${fmt.format(new Date())} IST`));
    update();
    setInterval(update, 15000);
  }
};
