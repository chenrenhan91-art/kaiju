export type Variant = {
  id: string;
  title: string;
  price: number;
  options: Record<string, string>;
};

export type Product = {
  handle: string;
  title: string;
  type: string;
  collections: string[];
  blurb: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  care: string;
  images: string[];
  variants: Variant[];
  rating?: number;
  reviewCount?: number;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  image: string;
};

export type CartLine = {
  productHandle: string;
  variantId: string;
  quantity: number;
};

export type OrderRecord = {
  id: string;
  createdAt: string;
  name: string;
  phone: string;
  email?: string;
  country: string;
  address: string;
  city: string;
  postal: string;
  notes: string;
  promoCode?: string;
  discountPercent: number;
  lines: {
    title: string;
    variantTitle: string;
    quantity: number;
    price: number;
    image: string;
    handle: string;
  }[];
  subtotal: number;
  discount: number;
  total: number;
};
