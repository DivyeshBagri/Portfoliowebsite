/* ==========================================================================
   Home page — renders data-driven parts, then runs the hero intro, the
   light-orb canvas, services accordion, horizontal work
   reel, process timeline, testimonials, chapter rail and CTA letters.
   ========================================================================== */
window.LL = window.LL || {};

LL.pages.home = {
  /* ---------- Render (runs before animations) ---------- */
  render() {
    const featured = LL.projects.slice(0, 4);

    // Work reel cards
    const reel = LL.qs("[data-reel]");
    if (reel) reel.insertAdjacentHTML("beforebegin", featured.map((p) => LL.render.projectCard(p)).join(""));

    // "Now showing" hero card
    const nowMedia = LL.qs("[data-now-media]");
    if (nowMedia) {
      nowMedia.innerHTML = LL.projects.map((p, i) =>
        `<img src="${p.cover}" alt="" width="1200" height="900" class="${i === 0 ? "is-active" : ""}">`).join("");
    }

    // Testimonials
    const stage = LL.qs("[data-quotes]");
    if (stage) {
      stage.innerHTML = LL.testimonials.map((t, i) => `
        <figure class="quote${i === 0 ? " is-active" : ""}" aria-hidden="${i !== 0}">
          <blockquote>${LL.escape(t.text)}</blockquote>
          <figcaption>
            <span class="quote-avatar" style="background:${t.tone}" aria-hidden="true">${t.initials}</span>
            <span class="quote-who"><strong>${LL.escape(t.name)}</strong><span>${LL.escape(t.role)}</span></span>
          </figcaption>
        </figure>`).join("");
    }

    // Team faces
    const faces = LL.qs("[data-faces]");
    if (faces) faces.innerHTML = LL.team.map((m, i) => LL.render.avatar(m, i)).join("");
  },

  /* ---------- Behaviour ---------- */
  init() {
    this.heroIntro();
    this.lumen();
    this.nowShowing();
    this.services();
    this.reel();
    this.process();
    this.quotes();
    this.chapters();
    this.ctaLetters();
  },

  heroIntro() {
    const title = LL.qs("[data-hero-title]");
    const path = LL.qs(".hero-underline path");
    if (!LL.motion || !title) return;

    const words = LL.splitWords(title);
    const len = path ? path.getTotalLength() : 0;
    if (path) gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

    const tl = gsap.timeline({ delay: 0.1 })
      .from(words, { yPercent: 115, duration: 1.3, stagger: 0.07, ease: "expo.out" })
      .from(LL.qsa("[data-hero-fade]"), { y: 28, opacity: 0, duration: 1.1, stagger: 0.08, ease: "expo.out" }, "-=0.95");
    if (path) tl.to(path, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" }, "-=1");
  },

  /* A slow-moving pool of light behind the hero that leans toward the pointer. */
  lumen() {
    const canvas = LL.qs("[data-lumen]");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const hero = canvas.parentElement;
    let w = 0, h = 0, colors = [];
    const target = { x: 0.74, y: 0.42 };
    const pos = { x: 0.74, y: 0.42 };
    let t = 0, visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = [cs.getPropertyValue("--accent"), cs.getPropertyValue("--accent-2")].map((c) => LL.hexToRgb(c));
    };
    const rgba = (rgb, a) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const size = Math.max(w, h);
      const blobs = [
        { x: pos.x * w + Math.cos(t * 1.3) * 60, y: pos.y * h + Math.sin(t) * 40, r: size * 0.36, c: colors[1], a: 0.7 },
        { x: pos.x * w - 120 + Math.sin(t * 0.8) * 90, y: pos.y * h + 80 + Math.cos(t * 1.1) * 60, r: size * 0.2, c: colors[0], a: 0.28 },
        { x: w * 0.1 + Math.sin(t * 0.6) * 50, y: h * 0.95, r: size * 0.22, c: colors[1], a: 0.35 }
      ];
      blobs.forEach((b) => {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0, rgba(b.c, b.a));
        g.addColorStop(1, rgba(b.c, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });
    };

    resize();
    readColors();
    window.addEventListener("resize", resize);
    document.addEventListener("ll:theme", () => { readColors(); if (LL.reduced) draw(); });

    if (LL.reduced) { draw(); return; }

    hero.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
    });
    new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(hero);

    const loop = () => {
      if (visible) {
        t += 0.005;
        pos.x += (target.x - pos.x) * 0.03;
        pos.y += (target.y - pos.y) * 0.03;
        draw();
      }
      requestAnimationFrame(loop);
    };
    loop();
  },

  nowShowing() {
    const imgs = LL.qsa("[data-now-media] img");
    const title = LL.qs("[data-now-title]");
    const meta = LL.qs("[data-now-meta]");
    const link = LL.qs("[data-now-link]");
    if (!imgs.length) return;
    let i = 0;
    const show = (n) => {
      imgs.forEach((img, k) => img.classList.toggle("is-active", k === n));
      const p = LL.projects[n];
      title.textContent = p.name;
      meta.textContent = p.categories[0];
      link.href = `project.html#${p.slug}`;
    };
    show(0);
    if (LL.reduced) return;
    setInterval(() => { i = (i + 1) % imgs.length; show(i); }, 3200);
  },

  services() {
    const items = LL.qsa(".svc");
    items.forEach((item) => {
      const btn = LL.qs(".svc-btn", item);
      btn.addEventListener("click", () => {
        const willOpen = !item.classList.contains("is-open");
        items.forEach((other) => {
          other.classList.remove("is-open");
          LL.qs(".svc-btn", other).setAttribute("aria-expanded", "false");
        });
        if (willOpen) {
          item.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
        setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 750);
      });
    });
  },

  /* Vertical scroll drives a horizontal reel on wide screens. */
  reel() {
    const section = LL.qs("[data-hs]");
    if (!section || !LL.motion) return;
    const track = LL.qs(".hs-track", section);
    const bar = LL.qs(".hs-progress span", section);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      section.classList.add("is-pinnable");
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => { if (bar) bar.style.transform = `scaleX(${self.progress})`; }
        }
      });

      LL.qsa(".pcard-media img", track).forEach((img) => {
        gsap.fromTo(img, { xPercent: -6, scale: 1.14 }, {
          xPercent: 6,
          scale: 1.14,
          ease: "none",
          scrollTrigger: { trigger: img.closest(".pcard"), containerAnimation: tween, start: "left right", end: "right left", scrub: true }
        });
      });

      return () => {
        section.classList.remove("is-pinnable");
        gsap.set(track, { clearProps: "transform" });
      };
    });
  },

  process() {
    const list = LL.qs(".process-list");
    if (!list || !LL.motion) return;
    const fill = LL.qs(".process-line span", list);
    list.classList.add("js-process");

    gsap.fromTo(fill, { scaleY: 0 }, {
      scaleY: 1,
      ease: "none",
      scrollTrigger: { trigger: list, start: "top 62%", end: "bottom 62%", scrub: true }
    });
    LL.qsa(".step", list).forEach((step) => {
      ScrollTrigger.create({ trigger: step, start: "top 66%", toggleClass: { targets: step, className: "is-active" } });
    });
  },

  quotes() {
    const quotes = LL.qsa(".quote");
    const count = LL.qs("[data-quote-count]");
    const wrap = LL.qs(".quotes");
    if (quotes.length < 2) return;
    let i = 0, timer = null;

    const show = (n) => {
      i = (n + quotes.length) % quotes.length;
      quotes.forEach((q, k) => {
        q.classList.toggle("is-active", k === i);
        q.setAttribute("aria-hidden", String(k !== i));
      });
      if (count) count.textContent = `${String(i + 1).padStart(2, "0")} / ${String(quotes.length).padStart(2, "0")}`;
    };
    const play = () => { if (!LL.reduced) { clearInterval(timer); timer = setInterval(() => show(i + 1), 7000); } };

    LL.qs("[data-quote-prev]").addEventListener("click", () => { show(i - 1); play(); });
    LL.qs("[data-quote-next]").addEventListener("click", () => { show(i + 1); play(); });
    wrap.addEventListener("pointerenter", () => clearInterval(timer));
    wrap.addEventListener("pointerleave", play);
    show(0);
    play();
  },

  chapters() {
    const rail = LL.qs("[data-rail]");
    const sections = LL.qsa("[data-chapter]");
    if (!rail || !sections.length || !LL.motion) return;
    const num = LL.qs("[data-rail-num]", rail);
    const title = LL.qs("[data-rail-title]", rail);
    const fill = LL.qs("[data-rail-fill]", rail);

    sections.forEach((sec, idx) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (!self.isActive) return;
          num.textContent = sec.dataset.chapter;
          title.textContent = sec.dataset.chapterTitle;
          gsap.to(fill, { scaleY: (idx + 1) / sections.length, duration: 0.8, ease: "expo.out" });
        }
      });
    });

    ScrollTrigger.create({
      trigger: sections[0],
      start: "top 60%",
      endTrigger: sections[sections.length - 1],
      end: "bottom 40%",
      onToggle: (self) => rail.classList.toggle("is-visible", self.isActive)
    });
  },

  ctaLetters() {
    const big = LL.qs("[data-cta-letters]");
    if (!big || !LL.motion) return;
    const chars = LL.splitChars(big);
    gsap.from(chars, {
      yPercent: 100,
      opacity: 0,
      rotate: 8,
      duration: 1.1,
      stagger: 0.04,
      ease: "expo.out",
      scrollTrigger: { trigger: big, start: "top 85%", once: true }
    });
    big.addEventListener("pointerenter", () => {
      gsap.to(chars, { yPercent: -14, duration: 0.35, stagger: { each: 0.035, yoyo: true, repeat: 1 }, ease: "power2.out" });
    });
  }
};
