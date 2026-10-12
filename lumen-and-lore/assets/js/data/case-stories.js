/* ==========================================================================
   Case study stories — each project is told with its own narrative device
   and layout. The layout key matches a file in assets/js/case/layouts/.
   ========================================================================== */
window.LL = window.LL || {};

LL.caseStories = {
  /* A café's day, told along a flower stem that grows down the page. */
  "brew-and-bloom": {
    layout: "stem",
    kicker: "A day in bloom",
    headline: "From the first cup to the last stem of the day.",
    beats: [
      { time: "07:00", title: "The first cup", art: "cup",
        text: "Brew & Bloom had grown from one Indiranagar café to four, and each outlet looked like a different business. The morning regulars loved the coffee. Almost nobody looked at the flowers." },
      { time: "11:00", title: "Flowers nobody noticed", art: "eye",
        text: "In forty customer interviews, people called it \"the calm café\". Not one person mentioned flowers, the founders' favourite part. The old coffee-cup logo was hiding the brand's most distinctive asset." },
      { time: "14:00", title: "A cup that opens into a flower", art: "bloom",
        text: "We built the brand around small daily rituals. The new mark is a cup seen from above that opens into a flower: coffee and flowers finally belong to one idea." },
      { time: "18:00", title: "A stem on the way home", art: "bag",
        text: "Every cup sleeve, takeaway bag and bouquet wrap carries the same petal pattern. Buying a stem on the way home started to feel like part of the coffee ritual." },
      { time: "21:00", title: "Lights down, flowers sold out", art: "moon",
        text: "The identity rolled out across all four cafés in eight weeks. Flowers went from an afterthought to a quarter of revenue, and three new outlets opened within the year." }
    ]
  },

  /* A loud category made quiet: a sound wave flattens as you scroll. */
  volt: {
    layout: "frames",
    kicker: "Hear the city again",
    headline: "Every scooter ad was shouting. We made silence the headline.",
    statements: [
      { label: "The brief", text: "Launch an electric scooter into a crowded market and fill the first batch with pre-bookings before it ships." },
      { label: "The problem", text: "Every competitor shouted range and speed. On the street, riders talked about something else: noise, fumes and the stress of traffic." },
      { label: "The idea", text: "Sell the feeling of silence. Billboards that are almost empty. A film with the engine noise removed. Test rides with headphones off." }
    ],
    frames: [
      { line: "Hear the city again.", place: "Billboard · MG Road, Pune" },
      { line: "0 dB of engine.", place: "Bus shelter · Koramangala" },
      { line: "Your street, unplugged.", place: "Metro panel · Baner" },
      { line: "Ride with headphones off.", place: "Event poster · Launch weekend" }
    ],
    outcome: "The campaign ran for six weeks across Pune and Bengaluru. Pre-bookings passed the year's target in the first month."
  },

  /* A saree is woven thread by thread, and so is the story. */
  saanjh: {
    layout: "loom",
    kicker: "Woven at dusk",
    headline: "Sixty-two hours on the loom, and a name on every tag.",
    steps: [
      { hour: "Hour 1", stage: "Setting the warp", title: "Forty families, no brand",
        text: "Forty weaving families in Varanasi wanted to stop selling through middlemen and build their own label. They had extraordinary craft and no brand at all." },
      { hour: "Hour 20", stage: "The first weft", title: "Handmade looked like machine-made",
        text: "Online, handloom is hard to tell apart from machine-made copies. Customers couldn't see the time and skill inside each piece, so they compared on price." },
      { hour: "Hour 48", stage: "Weaving the border", title: "Saanjh: the hour the looms go quiet",
        text: "We named the label Saanjh, meaning dusk. Every piece ships with a tag naming its weaver and the hours it spent on the loom, in a box made from loom offcuts." },
      { hour: "Hour 62", stage: "Off the loom", title: "Sold out in nine days",
        text: "The launch collection of 60 pieces sold out in nine days. The weaver tags became the most shared part of the brand, and three boutiques now stock it." }
    ],
    tag: { weaver: "Rukhsana Bano", village: "Sarai Mohana, Varanasi", hours: 62, piece: "Katan silk saree, madder red" }
  },

  /* A travel card, told as a journey with four stops. */
  nomad: {
    layout: "route",
    kicker: "Spend like a local",
    headline: "A money brand that feels like a well-worn passport.",
    stops: [
      { code: "BOM", city: "Mumbai", label: "Departure", title: "Strong product, forgettable brand",
        text: "Nomad offered a multi-currency card with no forex markup. But the brand looked like every other bank: navy, padlocks and fine print." },
      { code: "DXB", city: "Dubai", label: "Layover", title: "Safe or exciting? Both.",
        text: "Young travellers didn't trust a new money brand, and felt nothing for an old-looking one. Nomad had to feel safe and exciting at the same time." },
      { code: "IST", city: "Istanbul", label: "Connection", title: "Stamps, routes and boarding passes",
        text: "We designed the brand like a passport: stamps, routes and boarding-pass details. The card is coral with a dotted flight path, and every currency switch in the app animates the route from home." },
      { code: "LIS", city: "Lisbon", label: "Arrival", title: "Shown off at airports",
        text: "Downloads tripled in the first quarter after launch, and the coral card became a regular sight in travel content." }
    ],
    screens: [
      { currency: "EUR", symbol: "€", amount: "1,240.50", place: "Lisbon" },
      { currency: "AED", symbol: "AED", amount: "3,880.00", place: "Dubai" },
      { currency: "TRY", symbol: "₺", amount: "18,420", place: "Istanbul" }
    ]
  },

  /* A hotel day: the sky changes from sunrise to night as you read. */
  "tide-and-timber": {
    layout: "tide",
    kicker: "Stay for the slow part",
    headline: "A hotel brand built around the time of day, not the amenities.",
    moments: [
      { time: "6:12 am", label: "Sunrise", title: "Twelve rooms, one thumbnail",
        text: "A family-run hotel in a restored timber house wanted fewer platform bookings and more guests booking direct.", sky: ["#F4C9A8", "#F2E2CF"] },
      { time: "1:30 pm", label: "High tide", title: "Nothing said why it was different",
        text: "On booking sites it was a photo and a price. Nothing mentioned the timber, the quiet beach or the long breakfasts.", sky: ["#9CCAD6", "#E4EEEA"] },
      { time: "6:42 pm", label: "Sunset", title: "A website that follows the sun",
        text: "The website changes colour with the real sunrise and sunset in Goa. Room pages read like short stories of a day at the hotel.", sky: ["#E07A3F", "#F2B880"] },
      { time: "10:00 pm", label: "Night", title: "More direct bookings than ever",
        text: "Direct bookings overtook platform bookings in the first season, saving the owners commission and bringing guests back.", sky: ["#13293A", "#1F4E5F"] }
    ]
  },

  /* A skincare brand told like a pharmacy label: honest and precise. */
  kora: {
    layout: "ingredients",
    kicker: "Skin, as it is",
    headline: "five ingredients. no miracles. all listed on the front.",
    formula: [
      { n: "01", name: "The brief", amount: "5 ingredients or fewer",
        text: "Kora made simple, effective skincare. In a market full of glowing before-and-after photos, the brand was invisible." },
      { n: "02", name: "The problem", amount: "100% tired of beauty ads",
        text: "Kora's customers were tired of beauty marketing but still bought on Instagram. The brand needed to be honest without being boring." },
      { n: "03", name: "The idea", amount: "Ingredients > logo",
        text: "We put the full ingredient list on the front of every bottle, larger than the brand name. Social content shows real, unretouched skin." },
      { n: "04", name: "The outcome", amount: "140 retail doors",
        text: "After a 90-day content programme, Kora moved from online-only into a national beauty retail chain." }
    ],
    before: { title: "GLOW+", line: "Miracle radiance serum", small: "with 24 active botanicals" },
    after: { title: "kora", list: ["Aqua", "Glycerin", "Niacinamide 5%", "Squalane", "Panthenol"] }
  }
};
