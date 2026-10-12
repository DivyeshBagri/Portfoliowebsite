# Lumen & Lore — Brand & Story Studio

A portfolio website for a fictional branding and marketing agency. The site is told like a story in five chapters, with an animated logo intro, smooth scrolling, scroll-driven animation and a light/dark theme.

All clients, people, quotes, awards and figures are invented for demo purposes.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: hero with interactive light, manifesto, services, horizontal work reel, process timeline, numbers, clients, testimonials, team teaser, contact call to action |
| `work.html` | All projects with discipline filters |
| `project.html` | Case studies, chosen by hash (e.g. `project.html#volt`). Every project has its own storytelling layout (see below) |
| `about.html` | Studio story timeline, values, flip-card team, awards, careers |
| `contact.html` | Enquiry form with chips and validation, FAQ, studio details |

## Folder structure

```
lumen-and-lore/
├── index.html, work.html, project.html, about.html, contact.html
├── assets/
│   ├── favicon.svg
│   ├── css/
│   │   ├── tokens.css      colours (light + dark), type scale, spacing, easing
│   │   ├── base.css        reset, typography, layout primitives, utilities
│   │   ├── components.css  header, menu, buttons, avatars, brand intro, marquee, cards, forms, footer
│   │   ├── home.css        home page sections
│   │   ├── pages.css       work, studio and contact pages
│   │   └── case/           case study styles: shared.css + one file per layout
│   ├── js/
│   │   ├── data/projects.js      projects, team and testimonials (edit content here)
│   │   ├── data/case-stories.js  the story told on each case study page
│   │   ├── case/shared.js        shared case parts and line-drawing helpers
│   │   ├── case/layouts/         one file per case study layout
│   │   ├── core/              shared modules: utils, theme, scroll, nav, intro,
│   │   │                      magnetic, reveal
│   │   ├── pages/             one file per page: home, work, project, about, contact
│   │   └── main.js            boot order
│   └── img/work/              project cover artwork (SVG)
└── README.md
```

## Case study layouts

Each project tells its story with a different device:

| Project | Layout | The idea |
| --- | --- | --- |
| Brew & Bloom | `stem` | A flower stem draws itself down the page through a café's day, 07:00 to 21:00, with a line illustration for each hour |
| Volt | `frames` | A dark page in the client's colours. A noisy sound wave flattens and the dB meter falls to 0 as you scroll, then billboards slide past like film frames |
| Saanjh | `loom` | A loom beside the story weaves a new band of colour for each chapter while the hour counter climbs to 62, ending with the weaver's hang tag |
| Nomad | `route` | Four boarding-pass chapters (BOM → DXB → IST → LIS) joined by a flight path that the plane flies as you scroll |
| Tide & Timber | `tide` | One pinned scene: the sky shifts from sunrise to night and the sun travels its arc, revealing each chapter by time of day |
| Kora | `ingredients` | A pharmacy-label layout: formula sheet with hairline rules and a draggable before/after packaging slider |

To give a project a different layout, change its `layout` in `assets/js/data/case-stories.js`.

## Running it

No build step. Either open `index.html` in a browser, or serve the folder for the most reliable result:

```bash
npx serve .
# or
python3 -m http.server 8000
```

## Editing content

- **Projects:** add or edit an entry in `assets/js/data/projects.js`. The home reel, the Work page and the case study page all read from this file. Put a cover image in `assets/img/work/` and point `cover` at it.
- **Colours and fonts:** change the tokens in `assets/css/tokens.css`. Dark mode values live in the same file.
- **Animations:** add `data-split`, `data-reveal`, `data-reveal-stagger`, `data-count`, `data-scrub-words` or `data-parallax` to any element. See `assets/js/core/reveal.js`.

## Libraries (loaded from CDN)

- GSAP 3.12.5 + ScrollTrigger — animation and scroll-driven effects
- Lenis 1.1.13 — smooth scrolling
- Google Fonts — Gloock (display), Hanken Grotesk (text), JetBrains Mono (labels)

The site still works without JavaScript animation: all content is visible, and visitors with "reduce motion" enabled get a calm, static version.

## Contact form

The form validates input and shows a confirmation, but does not send anything. To make it live, replace the submit handler in `assets/js/pages/contact.js` with a call to a form service (Formspree, Netlify Forms, Basin) or your own endpoint.
