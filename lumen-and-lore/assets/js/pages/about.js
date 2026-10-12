/* ==========================================================================
   Studio page — renders team cards (flip on hover, tap on touch screens).
   ========================================================================== */
window.LL = window.LL || {};

LL.pages.about = {
  render() {
    const grid = LL.qs("[data-team]");
    if (!grid) return;
    grid.innerHTML = LL.team.map((m, i) => `
      <article class="member">
        <button class="member-card" type="button" aria-label="${LL.escape(m.name)}: show a fun fact">
          <span class="member-inner">
            <span class="member-face">${LL.render.avatar(m, i)}</span>
            <span class="member-face member-back">
              <span class="label">Fun fact</span>
              <span class="member-fact">${LL.escape(m.fact)}</span>
            </span>
          </span>
        </button>
        <div>
          <h3>${LL.escape(m.name)}</h3>
          <p class="role">${LL.escape(m.role)}</p>
        </div>
      </article>`).join("");
  },

  init() {
    LL.qsa(".member-card").forEach((card) => {
      card.addEventListener("click", () => card.classList.toggle("is-flipped"));
    });
  }
};
