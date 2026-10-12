/* ==========================================================================
   Contact page — service and budget chips, validation, demo submission,
   FAQ accordion. This is a demo site, so nothing is actually sent.
   ========================================================================== */
window.LL = window.LL || {};

LL.pages.contact = {
  init() {
    this.form();
    this.faq();
    LL.bindCopy();
  },

  form() {
    const form = LL.qs("[data-contact-form]");
    const success = LL.qs("[data-form-success]");
    if (!form) return;

    // Multi-select chips (services) and single-select chips (budget)
    LL.qsa("[data-chip-group]", form).forEach((group) => {
      const single = group.dataset.chipGroup === "single";
      const chips = LL.qsa(".chip", group);
      chips.forEach((chip) => chip.addEventListener("click", () => {
        if (single) chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
        else chip.setAttribute("aria-pressed", String(chip.getAttribute("aria-pressed") !== "true"));
        group.closest(".field").classList.remove("has-error");
        LL.qs(".field-error", group.closest(".field")).textContent = "";
      }));
    });

    // Message character count
    const msg = LL.qs("#message", form);
    const counter = LL.qs("[data-char-count]", form);
    const max = parseInt(msg.getAttribute("maxlength"), 10);
    const updateCount = () => (counter.textContent = `${msg.value.length} / ${max}`);
    msg.addEventListener("input", updateCount);
    updateCount();

    const setError = (field, text) => {
      field.classList.toggle("has-error", !!text);
      LL.qs(".field-error", field).textContent = text || "";
    };

    LL.qsa(".input", form).forEach((input) => input.addEventListener("input", () => setError(input.closest(".field"), "")));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let firstError = null;
      const check = (field, ok, text) => {
        setError(field, ok ? "" : text);
        if (!ok && !firstError) firstError = field;
      };

      const name = LL.qs("#name", form);
      const email = LL.qs("#email", form);
      check(name.closest(".field"), name.value.trim().length > 1, "Tell us your name so we know who to reply to.");
      check(email.closest(".field"), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), "Enter an email like you@company.com.");

      const services = LL.qsa('[data-chip-group="multi"] .chip[aria-pressed="true"]', form);
      check(LL.qs('[data-chip-group="multi"]', form).closest(".field"), services.length > 0, "Pick at least one thing we can help with.");

      const budget = LL.qs('[data-chip-group="single"] .chip[aria-pressed="true"]', form);
      check(LL.qs('[data-chip-group="single"]', form).closest(".field"), !!budget, "Choose a budget range. A rough guess is fine.");

      check(msg.closest(".field"), msg.value.trim().length >= 20, "Add a few lines about the project (at least 20 characters).");

      if (firstError) {
        const focusable = LL.qs("input, textarea, button", firstError);
        if (focusable) focusable.focus();
        return;
      }

      LL.qs("[data-success-name]", success).textContent = name.value.trim().split(" ")[0];
      form.hidden = true;
      success.hidden = false;
      if (LL.motion) gsap.from(success, { y: 30, opacity: 0, duration: 0.9, ease: "expo.out" });
      success.focus();
    });

    LL.qs("[data-form-reset]", success).addEventListener("click", () => {
      form.reset();
      LL.qsa('.chip[aria-pressed="true"]', form).forEach((c) => c.setAttribute("aria-pressed", "false"));
      updateCount();
      success.hidden = true;
      form.hidden = false;
      LL.qs("#name", form).focus();
    });
  },

  faq() {
    LL.qsa(".faq-item").forEach((item) => {
      const btn = LL.qs(".faq-q", item);
      btn.addEventListener("click", () => {
        const open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
      });
    });
  }
};
