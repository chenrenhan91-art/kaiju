export type NavChild = { href: string; label: string };

export type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
};

export const mainNav: NavItem[] = [
  {
    href: "/collections/jewelry-boxes",
    label: "Jewelry Boxes",
    children: [
      { href: "/collections/all-in-one-jewelry-box", label: "All-in-One Jewelry Boxes" },
      { href: "/collections/stackable-jewelry-box", label: "Stackable Jewelry Boxes" },
      { href: "/collections/drawer-jewelry-box", label: "Drawer Jewelry Boxes" },
      { href: "/collections/watch-box", label: "Watch Boxes" },
      { href: "/collections/ring-box", label: "Ring Boxes" },
      { href: "/collections/earring-box", label: "Earring Boxes" },
      { href: "/collections/necklace-box", label: "Necklace Boxes" },
      { href: "/collections/bracelet-box", label: "Bracelet Boxes" },
      { href: "/collections/bangle-box", label: "Bangle Boxes" },
    ],
  },
  {
    href: "/collections/mirror",
    label: "Mirrors",
    children: [
      { href: "/collections/handheld-mirror", label: "Hand Mirrors" },
      { href: "/collections/tabletop-mirror", label: "Tabletop Mirrors" },
      { href: "/collections/compact-mirror", label: "Compact Mirrors" },
      { href: "/collections/led-mirror", label: "LED Mirrors" },
    ],
  },
  {
    href: "/collections/comb",
    label: "Combs",
    children: [
      { href: "/collections/flat-paddle-comb", label: "Flat / Paddle Comb" },
      { href: "/collections/round-curved-comb", label: "Round / Curved Comb" },
    ],
  },
  {
    href: "/collections/vanity-dressing-storage",
    label: "Vanity Essentials",
    children: [
      { href: "/collections/makeup-organizer", label: "Makeup Organizers" },
      { href: "/collections/sunglasses-organizers", label: "Eyeglasses Case" },
      { href: "/collections/lipstick-organizer", label: "Lipstick Organizers" },
      { href: "/collections/tabletop-storage", label: "Tabletop Storage" },
    ],
  },
  {
    href: "/collections/style",
    label: "Shop by Style",
    children: [
      { href: "/collections/minimalist", label: "Minimalist" },
      { href: "/collections/retro-classic", label: "Retro & Classic" },
      { href: "/collections/modern-contemporary", label: "Modern & Contemporary" },
      { href: "/collections/oriental-style", label: "Oriental Style" },
      { href: "/collections/art-inlay", label: "Art Inlay" },
      { href: "/collections/figurative-style", label: "Figurative Style" },
    ],
  },
  {
    href: "/about",
    label: "Support",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/faqs", label: "FAQs" },
      { href: "/bulk-order", label: "Bulk Order Inquiry" },
    ],
  },
];

export const footerShop = [
  { href: "/collections/all-products", label: "All Crafts" },
  { href: "/collections/jewelry-boxes", label: "Jewelry Boxes" },
  { href: "/collections/mirror", label: "Mirrors" },
  { href: "/collections/comb", label: "Combs" },
  { href: "/collections/vanity-dressing-storage", label: "Vanity Essentials" },
  { href: "/collections/minimalist", label: "Minimalist" },
  { href: "/collections/retro-classic", label: "Retro & Classic" },
  { href: "/collections/modern-contemporary", label: "Modern & Contemporary" },
  { href: "/collections/oriental-style", label: "Oriental Style" },
  { href: "/collections/art-inlay", label: "Art Inlay" },
  { href: "/collections/figurative-style", label: "Figurative Style" },
];

export const footerSupport = [
  { href: "/about", label: "About Us" },
  { href: "/faqs", label: "FAQs" },
  { href: "/bulk-order", label: "Bulk Order Inquiry" },
];

export const footerPolicies = [
  { href: "/policies/payment", label: "Payment Methods" },
  { href: "/policies/shipping", label: "Shipping Policy" },
  { href: "/policies/returns", label: "Return & Refund Policy" },
  { href: "/policies/privacy", label: "Privacy Policy" },
  { href: "/policies/terms", label: "Terms of Service" },
];
