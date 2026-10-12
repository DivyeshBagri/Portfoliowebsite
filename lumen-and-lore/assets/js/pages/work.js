/* ==========================================================================
   Work index — renders every project and filters by discipline.
   ========================================================================== */
window.LL = window.LL || {};

LL.pages.work = {
  render() {
    const grid = LL.qs("[data-work-grid]");
    const chips = LL.qs("[data-filters]");
    if (!grid) return;

    grid.innerHTML = LL.projects.map((p) => LL.render.projectCard(p, { headingTag: "h2" })).join("");

    const cats = [...new Set(LL.projects.flatMap((p) => p.categories))];
    const countFor = (c) => LL.projects.filter((p) => p.categories.includes(c)).length;
    chips.innerHTML =
      `<button class="chip" type="button" data-filter="all" aria-pressed="true">All <span class="count">${LL.projects.length}</span></button>` +
      cats.map((c) => `<button class="chip" type="button" data-filter="${c}" aria-pressed="false">${c} <span class="count">${countFor(c)}</span></button>`).join("");

    this.updateCount(LL.projects.length);
  },

  updateCount(n) {
    const el = LL.qs("[data-work-count]");
    if (el) el.textContent = `Showing ${n} ${n === 1 ? "project" : "projects"}`;
  },

  init() {
    const grid = LL.qs("[data-work-grid]");
    const buttons = LL.qsa("[data-filter]");
    if (!grid) return;
    const cards = LL.qsa(".pcard", grid);

    if (LL.motion) {
      gsap.from(cards, {
        y: 80, opacity: 0, duration: 1.2, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: grid, start: "top 85%", once: true }
      });
    }

    buttons.forEach((btn) => btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      const matches = (card) => filter === "all" || card.dataset.categories.split(",").includes(filter);
      const showing = cards.filter(matches);
      this.updateCount(showing.length);

      const apply = () => {
        cards.forEach((card) => (card.hidden = !matches(card)));
        if (LL.motion) {
          gsap.fromTo(showing, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: "expo.out" });
          ScrollTrigger.refresh();
        }
      };

      const visible = cards.filter((c) => !c.hidden);
      if (LL.motion && visible.length) {
        gsap.to(visible, { opacity: 0, y: -20, duration: 0.3, ease: "power2.in", onComplete: apply });
      } else {
        apply();
      }
    }));
  }
};
