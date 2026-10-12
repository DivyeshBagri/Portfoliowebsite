/* ==========================================================================
   Project data — single source of truth for the home reel, the Work index
   and every case study page (project.html#<slug>).
   All clients, people and figures are fictional.
   ========================================================================== */
window.LL = window.LL || {};

LL.projects = [
  {
    slug: "brew-and-bloom",
    name: "Brew & Bloom",
    client: "Brew & Bloom Cafés",
    sector: "Food & beverage",
    year: 2025,
    location: "Bengaluru",
    categories: ["Identity", "Packaging"],
    services: ["Brand strategy", "Visual identity", "Packaging", "Signage"],
    summary: "A café chain that sells coffee and fresh flowers under one roof, rebranded around a single idea: small daily rituals.",
    cover: "assets/img/work/brew-and-bloom.svg",
    palette: [
      { name: "Fern", hex: "#2F4A3A" },
      { name: "Blush", hex: "#F2C7B5" },
      { name: "Oat", hex: "#E9DFC9" },
      { name: "Crema", hex: "#E9A23B" }
    ],
    type: [
      { role: "Display", name: "Bloom Serif (custom)", css: "Georgia, 'Times New Roman', serif", note: "Soft, rounded terminals drawn from petal shapes." },
      { role: "Text", name: "Grotesk Regular", css: "'Helvetica Neue', Arial, sans-serif", note: "Plain and warm for menus and price lists." }
    ],
    mock: { person: "Ananya Rao", role: "Head Roaster", tagline: "Coffee, freshly arranged.", note: "Single origin · Chikmagalur", social: "New season beans, new season stems. Come smell both.", handle: "brewandbloom", web: "brewandbloom.in" },
    story: {
      brief: "Brew & Bloom had grown from one Indiranagar café to four, but each outlet looked like a different business. Customers came for coffee and didn't notice the flowers, which were the founders' favourite part.",
      problem: "The old identity was a generic coffee-cup logo. Research showed regulars described the place as \"the calm café\" and nobody mentioned flowers. The brand was hiding its most distinctive asset.",
      idea: "We built the brand around small daily rituals: a cup in the morning, a stem on the way home. The new mark is a cup seen from above that opens into a flower. Every cup sleeve, bag and bouquet wrap carries the same petal pattern, so the coffee and the flowers finally belong to one brand.",
      outcome: "The new identity rolled out across all four cafés in eight weeks. Flower sales went from an afterthought to a quarter of revenue, and the chain opened three new outlets on the strength of the refreshed concept."
    },
    results: [
      { value: 62, prefix: "+", unit: "%", label: "footfall across outlets within six months" },
      { value: 24, unit: "%", label: "of revenue now comes from flowers, up from 6%" },
      { value: 3, unit: "", label: "new outlets opened in the year after launch" }
    ],
    quote: { text: "They found the thing we loved about our own business and made everyone else see it too.", name: "Nikhil & Sara Thomas", role: "Founders, Brew & Bloom" }
  },
  {
    slug: "volt",
    name: "Volt",
    client: "Volt Mobility",
    sector: "Electric vehicles",
    year: 2025,
    location: "Pune",
    categories: ["Campaign", "Digital"],
    services: ["Launch campaign", "Motion", "Out-of-home", "Performance media"],
    summary: "A launch campaign for an electric scooter startup that made silence the headline.",
    cover: "assets/img/work/volt.svg",
    palette: [
      { name: "Surge Blue", hex: "#1446FF" },
      { name: "Current", hex: "#FFD23F" },
      { name: "Asphalt", hex: "#0E0E10" },
      { name: "Chalk", hex: "#F4F2EC" }
    ],
    type: [
      { role: "Display", name: "Volt Heavy (custom)", css: "'Arial Black', Impact, sans-serif", note: "Compressed, heavy and built for motion." },
      { role: "Text", name: "Mono Grotesk", css: "'Courier New', ui-monospace, monospace", note: "Technical tone for specs and range figures." }
    ],
    mock: { person: "Dev Malhotra", role: "Head of Growth", tagline: "Hear the city again.", note: "Range 140 km · 0–40 in 3.1s", social: "Pune, meet the quietest thing on your street. Test rides open Saturday.", handle: "ridevolt", web: "ridevolt.in" },
    story: {
      brief: "Volt was launching its first scooter into a crowded market where every competitor shouted about range and speed. They needed pre-bookings before the first batch shipped.",
      problem: "Spec sheets all looked the same. In street interviews, riders didn't talk about kilometres. They talked about noise, fumes and the stress of traffic.",
      idea: "We made silence the hero. The campaign line \"Hear the city again\" ran on billboards that were almost empty, with a single small scooter and a lot of white space. A 30-second film played city sounds with the engine noise removed. Launch events invited people to ride with headphones off.",
      outcome: "The campaign ran for six weeks across Pune and Bengaluru. Pre-bookings passed the year's target in the first month, and the quiet billboards were widely shared online."
    },
    results: [
      { value: 18000, unit: "", label: "pre-bookings in the first six weeks" },
      { value: 2.4, unit: "M", decimals: 1, label: "people reached across film and out-of-home" },
      { value: 4.1, unit: "%", decimals: 1, label: "click-through rate on launch ads" }
    ],
    quote: { text: "Everyone told us to talk about range. Lumen & Lore told us to talk about peace and quiet. They were right.", name: "Priya Nair", role: "CMO, Volt Mobility" }
  },
  {
    slug: "saanjh",
    name: "Saanjh",
    client: "Saanjh Handloom Collective",
    sector: "Fashion & craft",
    year: 2024,
    location: "Varanasi",
    categories: ["Identity", "Packaging"],
    services: ["Naming", "Visual identity", "Packaging", "E-commerce"],
    summary: "A name, identity and packaging system for a collective of 40 handloom weavers selling directly to customers.",
    cover: "assets/img/work/saanjh.svg",
    palette: [
      { name: "Madder", hex: "#8C2F39" },
      { name: "Turmeric", hex: "#E0A458" },
      { name: "Unbleached", hex: "#F3EBDD" },
      { name: "Indigo", hex: "#2B2D42" }
    ],
    type: [
      { role: "Display", name: "Loom Italic (custom)", css: "Georgia, 'Times New Roman', serif", note: "An italic with thread-like joins between letters." },
      { role: "Text", name: "Humanist Sans", css: "'Gill Sans', 'Trebuchet MS', sans-serif", note: "Readable on tags as small as 6 pt." }
    ],
    mock: { person: "Rukhsana Bano", role: "Master Weaver", tagline: "Woven at dusk.", note: "Pure silk · 62 hours on the loom", social: "Every saree carries the name of the hands that made it. Meet Rukhsana.", handle: "saanjh.handloom", web: "saanjh.in" },
    story: {
      brief: "Forty weaving families in Varanasi wanted to stop selling through middlemen and build their own label. They had extraordinary craft and no brand at all.",
      problem: "Online, handloom is hard to tell apart from machine-made copies. Customers had no way to see the time and skill that went into each piece, so they compared on price.",
      idea: "We named the label Saanjh, meaning dusk, the hour when the looms go quiet. Every product ships with a tag naming the weaver and the hours spent on the loom. The packaging is a folded box made from loom offcuts, printed with the weave pattern of the saree inside.",
      outcome: "Saanjh launched online with 60 pieces and sold out in nine days. The weaver tags became the most shared part of the brand, and three boutique stores now stock the collection."
    },
    results: [
      { value: 180, prefix: "+", unit: "%", label: "weaver income compared with selling through traders" },
      { value: 9, unit: " days", label: "to sell out the launch collection" },
      { value: 3, unit: "", label: "boutique retail partners in the first year" }
    ],
    quote: { text: "For the first time, the buyer knows my name. That changed everything.", name: "Rukhsana Bano", role: "Master Weaver, Saanjh" }
  },
  {
    slug: "nomad",
    name: "Nomad",
    client: "Nomad Money",
    sector: "Fintech",
    year: 2024,
    location: "Mumbai",
    categories: ["Identity", "Digital"],
    services: ["Brand strategy", "Visual identity", "Product UI", "Motion"],
    summary: "Identity and app design for a travel card that makes spending abroad feel as easy as spending at home.",
    cover: "assets/img/work/nomad.svg",
    palette: [
      { name: "Deep Lagoon", hex: "#0B3D3A" },
      { name: "Coral", hex: "#FF8A5B" },
      { name: "Boarding Pass", hex: "#F5F2EA" },
      { name: "Sea Glass", hex: "#9BD1C7" }
    ],
    type: [
      { role: "Display", name: "Nomad Rounded (custom)", css: "'Arial Rounded MT Bold', 'Helvetica Neue', Arial, sans-serif", note: "Friendly rounded geometry for a money brand." },
      { role: "Text", name: "Interface Sans", css: "'Helvetica Neue', Arial, sans-serif", note: "Tuned for numbers, balances and currency codes." }
    ],
    mock: { person: "Aditya Shah", role: "Product Lead", tagline: "Spend like a local.", note: "Zero markup · 150 currencies", social: "Landed in Lisbon? Your card already knows. Rates locked, fees gone.", handle: "nomadmoney", web: "nomad.money" },
    story: {
      brief: "Nomad offered a multi-currency travel card with no forex markup. The product was strong, but the brand looked like every other bank, all navy and padlocks.",
      problem: "Young travellers didn't trust a new financial brand, and they didn't feel anything for an old-looking one. Nomad needed to feel safe and exciting at the same time.",
      idea: "We designed the brand like a well-worn passport: stamps, routes and boarding-pass details. The card itself is coral with a dotted flight path. In the app, every currency switch is a short animation of the route from home to wherever you are.",
      outcome: "The rebrand launched with the app redesign. Downloads tripled in the first quarter and the card became a regular sight in travel influencer content."
    },
    results: [
      { value: 300, unit: "K", label: "app downloads in the first quarter" },
      { value: 4.8, unit: "★", decimals: 1, label: "average app store rating after the redesign" },
      { value: 3, unit: "×", label: "growth in monthly active cards" }
    ],
    quote: { text: "We went from a bank people tolerated to a brand people show off at airports.", name: "Kavya Iyer", role: "Co-founder, Nomad Money" }
  },
  {
    slug: "tide-and-timber",
    name: "Tide & Timber",
    client: "Tide & Timber Hotels",
    sector: "Hospitality",
    year: 2023,
    location: "Goa",
    categories: ["Identity", "Digital"],
    services: ["Visual identity", "Website", "Art direction", "Signage"],
    summary: "A boutique coastal hotel brand and booking website built around slow mornings and long sunsets.",
    cover: "assets/img/work/tide-and-timber.svg",
    palette: [
      { name: "Deep Water", hex: "#1F4E5F" },
      { name: "Sunset", hex: "#E07A3F" },
      { name: "Driftwood", hex: "#6B4A2E" },
      { name: "Shell", hex: "#F2E7D3" }
    ],
    type: [
      { role: "Display", name: "Tidal Serif (custom)", css: "Georgia, 'Times New Roman', serif", note: "Long, relaxed letterforms with gentle curves." },
      { role: "Text", name: "Coastal Sans", css: "'Trebuchet MS', 'Helvetica Neue', sans-serif", note: "Clear and light for menus and room cards." }
    ],
    mock: { person: "Leon Fernandes", role: "General Manager", tagline: "Stay for the slow part.", note: "12 rooms · Morjim beach", social: "6:42 pm on the deck. No filter, no rush, no checkout before noon.", handle: "tideandtimber", web: "tideandtimber.com" },
    story: {
      brief: "A family-run 12-room property in north Goa wanted to move away from booking platforms and take more direct reservations.",
      problem: "On aggregator sites the hotel was a thumbnail and a price. Nothing told guests why it was different: the restored timber house, the quiet beach, the long breakfasts.",
      idea: "We built the brand around time of day rather than amenities. The website changes its colours with the real sunrise and sunset in Goa. Room pages are written as short stories of a day at the hotel, and the signage uses reclaimed boat timber.",
      outcome: "Direct bookings overtook platform bookings in the first season, saving the owners significant commission and giving them a direct relationship with returning guests."
    },
    results: [
      { value: 58, unit: "%", label: "of bookings now direct, up from 12%" },
      { value: 41, prefix: "+", unit: "%", label: "average length of stay" },
      { value: 92, unit: "%", label: "occupancy through the first monsoon season" }
    ],
    quote: { text: "Guests now arrive already in love with the place. The website does half our hospitality for us.", name: "Maria Fernandes", role: "Owner, Tide & Timber" }
  },
  {
    slug: "kora",
    name: "Kora",
    client: "Kora Skin",
    sector: "Beauty",
    year: 2023,
    location: "Delhi",
    categories: ["Campaign", "Packaging"],
    services: ["Packaging", "Social & content", "Art direction", "Influencer programme"],
    summary: "Packaging and a social content system for a clean skincare brand that refuses to promise miracles.",
    cover: "assets/img/work/kora.svg",
    palette: [
      { name: "Clay", hex: "#C76B5A" },
      { name: "Bare", hex: "#EFD9CF" },
      { name: "Soap", hex: "#FBF6F2" },
      { name: "Charcoal", hex: "#2E2A27" }
    ],
    type: [
      { role: "Display", name: "Kora Didone (custom)", css: "Didot, 'Bodoni MT', Georgia, serif", note: "High contrast, used lowercase only." },
      { role: "Text", name: "Clinical Sans", css: "'Helvetica Neue', Arial, sans-serif", note: "Ingredient lists set with pharmacy precision." }
    ],
    mock: { person: "Dr. Simran Kaur", role: "Formulator", tagline: "Skin, as it is.", note: "5 ingredients · fragrance free", social: "No filter on the face, no filler in the bottle. Five ingredients, all listed on the front.", handle: "koraskin", web: "koraskin.in" },
    story: {
      brief: "Kora made simple, effective skincare with five or fewer ingredients. In a market full of glowing before-and-after photos, the brand was invisible.",
      problem: "Kora's customers were tired of beauty marketing but still bought on Instagram. The brand needed to be honest without being boring.",
      idea: "We put the full ingredient list on the front of every bottle, larger than the brand name. The social content shows real, unretouched skin, with captions written by the formulator. The tagline \"Skin, as it is\" became a rule for every piece of content.",
      outcome: "The packaging launch was followed by a 90-day content programme. Kora's community grew quickly, and the brand moved from online-only into a national beauty retail chain."
    },
    results: [
      { value: 210, unit: "K", label: "new followers during the 90-day programme" },
      { value: 3.6, unit: "×", decimals: 1, label: "repeat purchase rate compared with launch" },
      { value: 140, unit: "", label: "retail doors added in the first year" }
    ],
    quote: { text: "They made honesty look beautiful. Our customers noticed immediately.", name: "Aanya Kapoor", role: "Founder, Kora Skin" }
  }
];

LL.team = [
  { name: "Meera Kulkarni", role: "Founder & Creative Director", initials: "MK", tone: "#3528E8", fact: "Keeps a drawer of 400 matchbox labels she has collected since 1998." },
  { name: "Arjun Sethi", role: "Strategy Lead", initials: "AS", tone: "#1F4E5F", fact: "Has interviewed over 1,200 customers and still asks \"why?\" five times." },
  { name: "Tanvi Rao", role: "Design Director", initials: "TR", tone: "#8C2F39", fact: "Will redraw a logo sixty times before showing you three." },
  { name: "Kabir Menon", role: "Head of Motion", initials: "KM", tone: "#0B3D3A", fact: "Animates his grocery lists. The onions bounce." },
  { name: "Ishita Banerjee", role: "Copy & Content Lead", initials: "IB", tone: "#C76B5A", fact: "Writes every headline twice: once for the brand, once for her grandmother." },
  { name: "Rohan D'Souza", role: "Digital Producer", initials: "RD", tone: "#2F4A3A", fact: "Has never missed a launch date. Has missed many lunches." }
];

LL.testimonials = [
  { text: "They found the thing we loved about our own business and made everyone else see it too.", name: "Nikhil Thomas", role: "Co-founder, Brew & Bloom", tone: "#2F4A3A", initials: "NT" },
  { text: "Everyone told us to talk about range. Lumen & Lore told us to talk about peace and quiet. They were right.", name: "Priya Nair", role: "CMO, Volt Mobility", tone: "#1446FF", initials: "PN" },
  { text: "We went from a bank people tolerated to a brand people show off at airports.", name: "Kavya Iyer", role: "Co-founder, Nomad Money", tone: "#0B3D3A", initials: "KI" }
];
