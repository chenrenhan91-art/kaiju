import { COMPANY } from "@/lib/company";

export const metadata = { title: "FAQs" };

const groups = [
  {
    title: "Ordering & Discounts",
    items: [
      {
        q: "How do I place an order?",
        a: "Add pieces to your cart and complete the checkout form with your name, phone, and shipping address. We then call you to confirm stock and payment. There is no online card checkout.",
      },
      {
        q: `How does the ${COMPANY.promoCode} code work?`,
        a: `Enter ${COMPANY.promoCode} on the checkout page for 10% off your first order. The discount applies to merchandise only.`,
      },
      {
        q: "Can I change or cancel an order?",
        a: `Call ${COMPANY.phone} as soon as you can. If the parcel has not been packed, we can usually change or cancel it.`,
      },
    ],
  },
  {
    title: "Payment",
    items: [
      {
        q: "How do I pay?",
        a: "After we confirm your order by phone, we share payment instructions. Bank transfer is the default. Card payment can be arranged on that call.",
      },
      {
        q: "When is payment due?",
        a: "Payment is due after we confirm stock and shipping, and before the parcel leaves.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      {
        q: "Do you offer free shipping?",
        a: "Yes. Tracked shipping is included on every order.",
      },
      {
        q: "Where do you ship?",
        a: "We ship internationally from Hong Kong. Delivery windows depend on destination and customs. We give an estimate on the confirmation call.",
      },
      {
        q: "How can I track my order?",
        a: "We send the tracking number by phone or text once the parcel is handed to the carrier.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        q: "Can I return or exchange items?",
        a: "Eligible unused items can be returned or exchanged within 60 days. Call us first so we can issue a return reference. Buyer is responsible for return shipping unless the item arrived damaged or incorrect.",
      },
    ],
  },
  {
    title: "Products & Care",
    items: [
      {
        q: "What materials are used?",
        a: "Solid hardwoods such as black walnut, cherry, beech, and rosewood, with a natural oil finish. Interiors may use suede or velvet lining.",
      },
      {
        q: "How should I care for my products?",
        a: "Dust with a dry soft cloth. Avoid standing water and strong sun. A drop of wood oil restores a dry surface.",
      },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      {
        q: "Do you store my details?",
        a: "Checkout details stay in your browser on this device so you can review the order. We use the phone number you provide only to confirm and ship your order.",
      },
    ],
  },
];

export default function FaqsPage() {
  return (
    <div className="page-width py-14 max-w-3xl">
      <h1 className="display text-5xl">FAQs</h1>
      <div className="mt-10 grid gap-10">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="display text-2xl mb-4">{group.title}</h2>
            <div>
              {group.items.map((item) => (
                <details key={item.q} className="border-t border-brown/15 py-4">
                  <summary className="font-medium cursor-pointer">{item.q}</summary>
                  <p className="mt-3 leading-relaxed text-brown-soft">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
