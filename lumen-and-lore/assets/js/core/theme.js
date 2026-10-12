/* ==========================================================================
   Theme — light / dark toggle. The saved choice is applied in each page's
   <head> before paint; this module handles the button and broadcasts
   an "ll:theme" event so canvases can re-read colours.
   ========================================================================== */
window.LL = window.LL || {};

LL.theme = {
  init() {
    this.buttons = LL.qsa("[data-theme-toggle]");
    this.buttons.forEach((btn) => btn.addEventListener("click", () => this.toggle()));
    this.sync();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      this.sync();
      document.dispatchEvent(new CustomEvent("ll:theme", { detail: this.current() }));
    });
  },

  current() {
    const set = document.documentElement.getAttribute("data-theme");
    if (set === "dark" || set === "light") return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  },

  toggle() {
    const next = this.current() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    LL.store.set("ll-theme", next);
    this.sync();
    document.dispatchEvent(new CustomEvent("ll:theme", { detail: next }));
  },

  sync() {
    const dark = this.current() === "dark";
    this.buttons.forEach((btn) => {
      btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      btn.setAttribute("aria-pressed", String(dark));
    });
  }
};
