/* ==========================================================================
   Case study router — picks the project from the URL hash
   (project.html#volt) and hands it to that project's own layout in
   assets/js/case/layouts/. Each layout tells the story differently.
   ========================================================================== */
window.LL = window.LL || {};

LL.pages.project = {
  current() {
    const slug = decodeURIComponent(window.location.hash.replace("#", ""));
    return LL.projects.find((p) => p.slug === slug) || LL.projects[0];
  },

  render() {
    const root = LL.qs("[data-project-root]");
    if (!root) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const p = this.current();
    const story = LL.caseStories[p.slug];
    const layout = LL.layouts[story.layout];

    this.state = { root, p, story, layout };
    document.title = `${p.name} · Lumen & Lore`;
    root.className = `case case--${story.layout}`;
    root.setAttribute("style", LL.case.vars(p));
    root.innerHTML = layout.render(p, story) + LL.case.quote(p) + LL.case.next(p);
  },

  init() {
    const { root, p, story, layout } = this.state || {};
    if (!root) return;
    if (layout.init) layout.init(root, p, story); // layouts may build SVG paths first
    LL.case.animate(root);

    // Moving to another project from this page: fade, then load it fresh.
    window.addEventListener("hashchange", () => {
      const reload = () => { window.scrollTo(0, 0); window.location.reload(); };
      if (LL.motion) gsap.to(root, { opacity: 0, duration: 0.35, ease: "power2.out", onComplete: reload });
      else reload();
    });
  }
};
