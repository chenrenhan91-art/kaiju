import type { Collection, Product } from "./types";

const img = (file: string) => `/images/${file}`;

function product(
  handle: string,
  title: string,
  type: string,
  collections: string[],
  images: string[],
  price: number,
  extra?: Partial<Product> & { variantName?: string; variantValues?: string[] },
): Product {
  const variantValues = extra?.variantValues;
  const variants = variantValues
    ? variantValues.map((value, i) => ({
        id: `${handle}-${i}`,
        title: value,
        price: +(price + i * 18).toFixed(2),
        options: { [extra?.variantName ?? "Style"]: value },
      }))
    : [
        {
          id: `${handle}-0`,
          title: "Default",
          price,
          options: {},
        },
      ];

  return {
    handle,
    title,
    type,
    collections: Array.from(new Set(["all-products", ...collections])),
    blurb:
      extra?.blurb ??
      "Solid hardwood storage made for daily rituals, with considered compartments and a calm finish.",
    description:
      extra?.description ??
      "Cut, sanded, and finished from solid hardwood. Interior trays keep pieces apart so they are easy to put back at the end of the day.",
    features: extra?.features ?? [
      "Solid hardwood construction",
      "Smooth, closed-pore finish",
      "Fitted interior for daily pieces",
      "Inspected before packing",
    ],
    specs: extra?.specs ?? [
      { label: "Material", value: "Solid hardwood" },
      { label: "Finish", value: "Natural oil, low sheen" },
      { label: "Origin", value: "Packed and shipped from our Hong Kong office" },
    ],
    care:
      extra?.care ??
      "Dust with a dry soft cloth. Keep away from standing water and strong sunlight. Refresh the finish with a small amount of wood oil if the surface looks dry.",
    images,
    variants,
    rating: extra?.rating,
    reviewCount: extra?.reviewCount,
  };
}

export const collections: Collection[] = [
  {
    handle: "all-products",
    title: "All Crafts",
    description: "Wooden jewelry boxes, vanity storage, mirrors, and combs.",
    image: img("hero-banner.png"),
  },
  {
    handle: "jewelry-boxes",
    title: "Jewelry Boxes",
    description: "Designed to keep necklaces flat, rings separated, and earrings easy to find.",
    image: img("box-walnut-open.png"),
  },
  {
    handle: "all-in-one-jewelry-box",
    title: "All-in-One Jewelry Box",
    description: "One box for mixed collections.",
    image: img("box-walnut-closed.png"),
  },
  {
    handle: "stackable-jewelry-box",
    title: "Stackable Jewelry Box",
    description: "Trays that grow with what you keep.",
    image: img("box-stackable.png"),
  },
  {
    handle: "drawer-jewelry-box",
    title: "Drawer Jewelry Box",
    description: "Drawers for rings, chains, and small tools of getting ready.",
    image: img("box-drawers.png"),
  },
  {
    handle: "watch-box",
    title: "Watch Boxes",
    description: "Cushioned slots for watches at rest.",
    image: img("watch-box.png"),
  },
  {
    handle: "ring-box",
    title: "Ring Box",
    description: "A small, dedicated home for rings.",
    image: img("box-ring.png"),
  },
  {
    handle: "earring-box",
    title: "Earring Box",
    description: "Rows that keep pairs together.",
    image: img("box-earring.png"),
  },
  {
    handle: "necklace-box",
    title: "Necklace Box",
    description: "Long trays so chains stay flat.",
    image: img("box-necklace.png"),
  },
  {
    handle: "bracelet-box",
    title: "Bracelet Boxes",
    description: "Open trays for bangles and bracelets.",
    image: img("box-necklace.png"),
  },
  {
    handle: "bangle-box",
    title: "Bangle Boxes",
    description: "Round-friendly storage for stacked bangles.",
    image: img("box-inlay.png"),
  },
  {
    handle: "mirror",
    title: "Mirrors",
    description: "For getting ready, anywhere.",
    image: img("mirror-tabletop.png"),
  },
  {
    handle: "handheld-mirror",
    title: "Hand Mirrors",
    description: "Solid wood handles, balanced in the hand.",
    image: img("mirror-hand.png"),
  },
  {
    handle: "tabletop-mirror",
    title: "Tabletop Mirrors",
    description: "Standing mirrors for the dressing table.",
    image: img("mirror-tabletop.png"),
  },
  {
    handle: "compact-mirror",
    title: "Compact Mirrors",
    description: "Pocket-size wood mirrors.",
    image: img("mirror-pocket.png"),
  },
  {
    handle: "led-mirror",
    title: "LED Mirrors",
    description: "Even light for makeup and morning checks.",
    image: img("mirror-led.png"),
  },
  {
    handle: "comb",
    title: "Combs",
    description: "For simple hair care.",
    image: img("comb-painted.png"),
  },
  {
    handle: "flat-paddle-comb",
    title: "Flat / Paddle Comb",
    description: "Wide teeth for detangling.",
    image: img("comb-painted.png"),
  },
  {
    handle: "round-curved-comb",
    title: "Round / Curved Comb",
    description: "Curved spines that sit well in the hand.",
    image: img("comb-painted.png"),
  },
  {
    handle: "vanity-dressing-storage",
    title: "Vanity Essentials",
    description: "For keeping things in place.",
    image: img("vanity-cabinet.png"),
  },
  {
    handle: "makeup-organizer",
    title: "Makeup Organizers",
    description: "Bottles, brushes, and palettes with a place to stand.",
    image: img("makeup-organizer.png"),
  },
  {
    handle: "sunglasses-organizers",
    title: "Eyeglasses Case",
    description: "Slots that keep frames from rubbing.",
    image: img("glasses-organizer.png"),
  },
  {
    handle: "lipstick-organizer",
    title: "Lipstick Organizers",
    description: "Grid slots for tubes you reach for daily.",
    image: img("lipstick-organizer.png"),
  },
  {
    handle: "tabletop-storage",
    title: "Tabletop Storage",
    description: "Boxes and drawers for the desk and dressing table.",
    image: img("keepsake-box.png"),
  },
  {
    handle: "style",
    title: "Shop by Style",
    description: "By form and tone.",
    image: img("style-minimalist.png"),
  },
  {
    handle: "minimalist",
    title: "Minimalist",
    description: "Quiet lines, open grain, little ornament.",
    image: img("style-minimalist.png"),
  },
  {
    handle: "retro-classic",
    title: "Retro & Classic",
    description: "Curved lids and warmer antique tones.",
    image: img("style-retro.png"),
  },
  {
    handle: "modern-contemporary",
    title: "Modern & Contemporary",
    description: "Sharp edges, glass lids, architectural volumes.",
    image: img("style-modern.png"),
  },
  {
    handle: "oriental-style",
    title: "Oriental Style",
    description: "Carved rosewood and traditional motifs.",
    image: img("style-oriental.png"),
  },
  {
    handle: "art-inlay",
    title: "Art Inlay",
    description: "Floral and pictorial inlay on the lid.",
    image: img("box-inlay.png"),
  },
  {
    handle: "figurative-style",
    title: "Figurative Style",
    description: "Sculpted forms and pictorial lids.",
    image: img("style-oriental.png"),
  },
];

export const products: Product[] = [
  product(
    "nora-walnut-jewelry-box",
    "Nora Walnut Jewelry Box",
    "Jewelry Box",
    ["jewelry-boxes", "all-in-one-jewelry-box", "minimalist"],
    [img("box-walnut-closed.png"), img("box-walnut-open.png")],
    142.9,
    { variantName: "Wood", variantValues: ["Black Walnut", "Cherry"] },
  ),
  product(
    "iris-open-tray-jewelry-box",
    "Iris Open Tray Jewelry Box",
    "Jewelry Box",
    ["jewelry-boxes", "all-in-one-jewelry-box", "modern-contemporary"],
    [img("box-walnut-open.png"), img("box-walnut-closed.png")],
    150.9,
  ),
  product(
    "thea-stackable-jewelry-trays",
    "Thea Stackable Jewelry Trays",
    "Jewelry Box",
    ["jewelry-boxes", "stackable-jewelry-box", "minimalist"],
    [img("box-stackable.png"), img("box-walnut-open.png")],
    59.9,
    { variantName: "Set", variantValues: ["Two trays", "Three trays"] },
  ),
  product(
    "wren-three-drawer-jewelry-cabinet",
    "Wren Three-Drawer Jewelry Cabinet",
    "Jewelry Box",
    ["jewelry-boxes", "drawer-jewelry-box", "all-in-one-jewelry-box", "retro-classic"],
    [img("box-drawers.png"), img("box-walnut-open.png")],
    219.9,
  ),
  product(
    "sienna-walnut-ring-casket",
    "Sienna Walnut Ring Casket",
    "Ring Box",
    ["jewelry-boxes", "ring-box", "minimalist"],
    [img("box-ring.png"), img("box-walnut-closed.png")],
    62.9,
    { rating: 5, reviewCount: 4 },
  ),
  product(
    "lena-earring-tray",
    "Lena Earring Tray",
    "Jewelry Box",
    ["jewelry-boxes", "earring-box"],
    [img("box-earring.png"), img("box-stackable.png")],
    81.9,
  ),
  product(
    "mae-necklace-tray",
    "Mae Necklace Tray",
    "Jewelry Box",
    ["jewelry-boxes", "necklace-box"],
    [img("box-necklace.png"), img("box-walnut-open.png")],
    95.9,
  ),
  product(
    "ottilie-floral-inlay-jewelry-box",
    "Ottilie Floral Inlay Jewelry Box",
    "Jewelry Box",
    ["jewelry-boxes", "all-in-one-jewelry-box", "art-inlay", "oriental-style", "figurative-style"],
    [img("box-inlay.png"), img("box-walnut-open.png")],
    131.9,
  ),
  product(
    "beatrix-locking-jewelry-box",
    "Beatrix Locking Jewelry Box",
    "Jewelry Box",
    ["jewelry-boxes", "all-in-one-jewelry-box", "minimalist"],
    [img("box-walnut-closed.png"), img("box-walnut-open.png")],
    91.08,
    {
      variantName: "Closure",
      variantValues: ["Magnetic Closure", "Key Lock", "Combination Lock"],
    },
  ),
  product(
    "coralie-rosewood-jewelry-box",
    "Coralie Rosewood Jewelry Box",
    "Jewelry Box",
    ["jewelry-boxes", "oriental-style", "art-inlay", "bracelet-box", "bangle-box"],
    [img("box-inlay.png"), img("style-oriental.png")],
    95.9,
  ),
  product(
    "juniper-walnut-treasure-chest",
    "Juniper Walnut Treasure Chest",
    "Jewelry Box",
    ["jewelry-boxes", "all-in-one-jewelry-box", "retro-classic"],
    [img("style-retro.png"), img("box-walnut-open.png")],
    173.88,
    { variantName: "Interior", variantValues: ["Jewelry Box", "Bracelet Box", "Empty Box"] },
  ),
  product(
    "marlowe-glass-lid-jewelry-box",
    "Marlowe Glass-Lid Jewelry Box",
    "Jewelry Box",
    ["jewelry-boxes", "all-in-one-jewelry-box", "modern-contemporary"],
    [img("style-modern.png"), img("box-walnut-open.png")],
    150.9,
  ),
  product(
    "paloma-rattan-jewelry-cabinet",
    "Paloma Rattan Jewelry Cabinet",
    "Jewelry Box",
    ["jewelry-boxes", "drawer-jewelry-box", "all-in-one-jewelry-box", "retro-classic"],
    [img("box-drawers.png"), img("style-retro.png")],
    219.9,
  ),
  product(
    "quinn-cherry-jewelry-cabinet",
    "Quinn Cherry Jewelry Cabinet",
    "Jewelry Box",
    ["jewelry-boxes", "drawer-jewelry-box", "minimalist"],
    [img("box-drawers.png"), img("desk-organizer.png")],
    203.88,
  ),
  product(
    "rhea-walnut-watch-box",
    "Rhea Walnut Watch Box",
    "Watch Collection Box",
    ["watch-box", "jewelry-boxes", "minimalist"],
    [img("watch-box.png"), img("box-walnut-closed.png")],
    75.9,
    { variantName: "Slots", variantValues: ["2-Slot", "5-Slot"] },
  ),
  product(
    "sabine-painted-watch-box",
    "Sabine Painted Watch Box",
    "Watch Collection Box",
    ["watch-box", "retro-classic", "art-inlay"],
    [img("watch-box.png"), img("box-inlay.png")],
    247.08,
    { variantName: "Slots", variantValues: ["5-Slot", "10-Slot"] },
  ),
  product(
    "tamsin-bangle-box",
    "Tamsin Bangle Box",
    "Wooden Bangles Box",
    ["bangle-box", "bracelet-box", "jewelry-boxes", "oriental-style"],
    [img("box-inlay.png"), img("box-walnut-open.png")],
    104.9,
  ),
  product(
    "uma-bracelet-tray",
    "Uma Bracelet Tray",
    "Jewelry Box",
    ["bracelet-box", "jewelry-boxes"],
    [img("box-necklace.png"), img("box-stackable.png")],
    88.9,
  ),
  product(
    "anouk-walnut-keepsake-box",
    "Anouk Walnut Document & Keepsake Box",
    "Organizer Box",
    ["vanity-dressing-storage", "tabletop-storage", "minimalist"],
    [img("keepsake-box.png"), img("ripple-box.png")],
    188.9,
  ),
  product(
    "blythe-walnut-vanity-cabinet",
    "Blythe Walnut Vanity Cabinet",
    "Makeup Organizer",
    ["vanity-dressing-storage", "makeup-organizer", "retro-classic"],
    [img("vanity-cabinet.png"), img("makeup-organizer.png")],
    461.9,
  ),
  product(
    "cosima-lipstick-stand",
    "Cosima 21-Slot Lipstick Stand",
    "Makeup Organizer",
    ["vanity-dressing-storage", "lipstick-organizer", "minimalist"],
    [img("lipstick-organizer.png"), img("makeup-organizer.png")],
    161.9,
  ),
  product(
    "faye-cherry-desk-organizer",
    "Faye Cherry Desk Organizer",
    "Organizer Box",
    ["vanity-dressing-storage", "tabletop-storage", "minimalist"],
    [img("desk-organizer.png"), img("box-drawers.png")],
    221.9,
  ),
  product(
    "gwyneth-glass-brush-organizer",
    "Gwyneth Glass Brush Organizer",
    "Makeup Organizer",
    ["vanity-dressing-storage", "makeup-organizer", "retro-classic", "art-inlay"],
    [img("brush-organizer.png"), img("makeup-organizer.png")],
    104.9,
  ),
  product(
    "hester-makeup-caddy",
    "Hester Makeup Caddy",
    "Makeup Organizer",
    ["vanity-dressing-storage", "makeup-organizer", "oriental-style", "art-inlay", "tabletop-storage"],
    [img("makeup-organizer.png"), img("brush-organizer.png")],
    197.9,
  ),
  product(
    "imogen-three-drawer-organizer",
    "Imogen Three-Drawer Tabletop Organizer",
    "Organizer Box",
    ["vanity-dressing-storage", "tabletop-storage", "minimalist"],
    [img("box-drawers.png"), img("desk-organizer.png")],
    307.9,
  ),
  product(
    "josette-ripple-lid-box",
    "Josette Ripple Lid Storage Box",
    "Jewelry Box",
    ["vanity-dressing-storage", "tabletop-storage", "minimalist"],
    [img("ripple-box.png"), img("keepsake-box.png")],
    81.9,
  ),
  product(
    "kit-walnut-glasses-organizer",
    "Kit Walnut Glasses Organizer",
    "Sunglasses Organizer",
    ["vanity-dressing-storage", "sunglasses-organizers", "minimalist"],
    [img("glasses-organizer.png"), img("keepsake-box.png")],
    143.9,
  ),
  product(
    "linnea-rotating-makeup-organizer",
    "Linnea Rotating Makeup Organizer",
    "Makeup Organizer",
    ["vanity-dressing-storage", "makeup-organizer", "retro-classic"],
    [img("makeup-organizer.png"), img("vanity-cabinet.png")],
    285.9,
  ),
  product(
    "willa-pocket-mirror",
    "Willa Pocket Mirror",
    "Wooden Mirror",
    ["mirror", "compact-mirror"],
    [img("mirror-pocket.png"), img("mirror-hand.png")],
    15.9,
  ),
  product(
    "yara-tabletop-mirror",
    "Yara Tabletop Mirror",
    "Wooden Mirror",
    ["mirror", "tabletop-mirror", "retro-classic"],
    [img("mirror-tabletop.png"), img("mirror-hand.png")],
    141.9,
    { rating: 5, reviewCount: 2 },
  ),
  product(
    "zosia-led-tabletop-mirror",
    "Zosia LED Tabletop Mirror",
    "Wooden Mirror",
    ["mirror", "led-mirror", "tabletop-mirror", "retro-classic"],
    [img("mirror-led.png"), img("mirror-tabletop.png")],
    169.9,
  ),
  product(
    "anwen-standing-mirror",
    "Anwen Standing Mirror",
    "Wooden Mirror",
    ["mirror", "tabletop-mirror", "retro-classic"],
    [img("mirror-tabletop.png"), img("mirror-led.png")],
    153.9,
  ),
  product(
    "bronte-led-makeup-mirror",
    "Bronte LED Makeup Mirror",
    "Wooden Mirror",
    ["mirror", "led-mirror"],
    [img("mirror-led.png"), img("mirror-pocket.png")],
    148.9,
  ),
  product(
    "clio-walnut-hand-mirror",
    "Clio Walnut Hand Mirror",
    "Wooden Mirror",
    ["mirror", "handheld-mirror"],
    [img("mirror-hand.png"), img("mirror-pocket.png")],
    82.9,
  ),
  product(
    "dara-painted-comb",
    "Dara Painted Fine-Tooth Comb",
    "Comb",
    ["comb", "round-curved-comb", "art-inlay"],
    [img("comb-painted.png"), img("comb-mirror-set.png")],
    64.9,
  ),
  product(
    "elowen-painted-comb",
    "Elowen Painted Fine-Tooth Comb",
    "Comb",
    ["comb", "flat-paddle-comb", "art-inlay"],
    [img("comb-painted.png"), img("style-oriental.png")],
    68.9,
  ),
  product(
    "farah-comb-mirror-set",
    "Farah Comb & Mirror Set",
    "Comb",
    ["comb", "handheld-mirror", "art-inlay"],
    [img("comb-mirror-set.png"), img("comb-painted.png")],
    72.9,
  ),
  product(
    "gala-painted-comb",
    "Gala Painted Fine-Tooth Comb",
    "Comb",
    ["comb", "round-curved-comb"],
    [img("comb-painted.png"), img("comb-mirror-set.png")],
    59.9,
  ),
  product(
    "hadley-curved-comb",
    "Hadley Curved Comb",
    "Comb",
    ["comb", "round-curved-comb"],
    [img("comb-painted.png"), img("comb-mirror-set.png")],
    59.9,
  ),
  product(
    "iona-paddle-comb",
    "Iona Paddle Comb",
    "Comb",
    ["comb", "flat-paddle-comb"],
    [img("comb-painted.png"), img("comb-mirror-set.png")],
    64.9,
  ),
];

export const jewelryTypeHandles = [
  "all-in-one-jewelry-box",
  "stackable-jewelry-box",
  "drawer-jewelry-box",
  "ring-box",
  "earring-box",
  "necklace-box",
] as const;

export const styleHandles = [
  "minimalist",
  "retro-classic",
  "modern-contemporary",
  "oriental-style",
  "art-inlay",
] as const;

export const vanityFeatured = [
  "anouk-walnut-keepsake-box",
  "blythe-walnut-vanity-cabinet",
  "cosima-lipstick-stand",
  "faye-cherry-desk-organizer",
  "gwyneth-glass-brush-organizer",
  "hester-makeup-caddy",
  "imogen-three-drawer-organizer",
  "josette-ripple-lid-box",
  "kit-walnut-glasses-organizer",
];

export const mirrorFeatured = [
  "willa-pocket-mirror",
  "yara-tabletop-mirror",
  "zosia-led-tabletop-mirror",
  "anwen-standing-mirror",
  "bronte-led-makeup-mirror",
  "clio-walnut-hand-mirror",
];

export const combFeatured = [
  "dara-painted-comb",
  "elowen-painted-comb",
  "farah-comb-mirror-set",
  "gala-painted-comb",
  "hadley-curved-comb",
  "iona-paddle-comb",
];

export function getProduct(handle: string) {
  return products.find((p) => p.handle === handle);
}

export function getCollection(handle: string) {
  return collections.find((c) => c.handle === handle);
}

export function productsInCollection(handle: string) {
  return products.filter((p) => p.collections.includes(handle));
}

export function searchProducts(q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  return products.filter((p) =>
    [p.title, p.type, p.blurb, ...p.collections].join(" ").toLowerCase().includes(query),
  );
}

export function relatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.handle !== product.handle && p.collections.some((c) => product.collections.includes(c)))
    .slice(0, limit);
}

export const reviews = [
  {
    name: "Mina K.",
    location: "Singapore",
    quote: "The trays actually fit mixed jewelry. I stop leaving rings next to the sink.",
  },
  {
    name: "Helen R.",
    location: "London",
    quote: "Walnut grain is even, drawers run quietly. It looks settled on the dressing table.",
  },
  {
    name: "Priya S.",
    location: "Melbourne",
    quote: "I ordered the lipstick stand and the brush well together. Everything has a slot now.",
  },
];

export const ideas = [
  {
    slug: "keeping-a-small-vanity-clear",
    title: "Keeping a Small Vanity Clear",
    excerpt: "A few wood trays can replace the scatter of bottles, earrings, and hair ties.",
    image: img("makeup-organizer.png"),
  },
  {
    slug: "why-solid-wood-still-makes-sense",
    title: "Why Solid Wood Still Makes Sense",
    excerpt: "Hardwood takes oil, shows age honestly, and does not need a new finish every season.",
    image: img("about-grain.png"),
  },
  {
    slug: "a-quiet-place-for-everyday-jewelry",
    title: "A Quiet Place for Everyday Jewelry",
    excerpt: "Separate rings from chains. Give necklaces a long tray. Put the box where you undress.",
    image: img("box-walnut-open.png"),
  },
];
