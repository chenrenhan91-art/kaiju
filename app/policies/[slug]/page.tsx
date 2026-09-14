import { COMPANY } from "@/lib/company";

export function generateStaticParams() {
  return ["payment", "shipping", "returns", "privacy", "terms"].map((slug) => ({ slug }));
}

const pages: Record<string, { title: string; body: string[] }> = {
  payment: {
    title: "Payment Methods",
    body: [
      "This website does not charge cards in the browser. After you submit checkout, KAIJU TRADE LIMITED calls or emails you to confirm stock, shipping, and payment.",
      "Bank transfer is the default. Card payment can be arranged on that call if needed.",
      `Questions: ${COMPANY.phone} or ${COMPANY.email}.`,
    ],
  },
  shipping: {
    title: "Shipping Policy",
    body: [
      "Tracked shipping is included on every order.",
      "Parcels ship from Hong Kong after payment is confirmed. International transit times vary by destination and customs.",
      "You receive a tracking number by phone, email, or text once the carrier has the parcel.",
      `Questions: ${COMPANY.phone} or ${COMPANY.email}.`,
    ],
  },
  returns: {
    title: "Return & Refund Policy",
    body: [
      "Unused items in original packing may be returned or exchanged within 60 days of delivery.",
      "Call or email us before sending anything back so we can issue a return reference.",
      "If we sent the wrong item or it arrived damaged, we cover return shipping. Otherwise return shipping is the buyer’s responsibility.",
      "Refunds go back by the same method used for payment, after we inspect the return.",
      `Questions: ${COMPANY.phone} or ${COMPANY.email}.`,
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "We collect the name, phone number, optional email, and shipping address you type at checkout so we can confirm and ship your order.",
      `Our company inbox is ${COMPANY.email}. Order copies stored in this browser stay on your device; a copy of checkout and bulk inquiries is also sent to that inbox.`,
      "We do not sell personal information.",
      `Contact: ${COMPANY.legalName}, ${COMPANY.addressLines.join(", ")}, ${COMPANY.phone}, ${COMPANY.email}.`,
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      `The KAIJU storefront is operated by ${COMPANY.legalName}, Hong Kong.`,
      "Submitting checkout is a request to buy, not a completed sale. The contract forms when we confirm the order and payment by phone or email.",
      "Product photos are representative. Wood grain and inlay vary from piece to piece.",
      "Hong Kong law governs these terms.",
      `Questions: ${COMPANY.phone} or ${COMPANY.email}.`,
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: pages[slug]?.title ?? "Policy" };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) {
    return (
      <div className="page-width py-16">
        <h1 className="display text-4xl">Policy</h1>
        <p className="mt-4">This page is not available.</p>
      </div>
    );
  }
  return (
    <div className="page-width py-14 max-w-3xl">
      <h1 className="display text-4xl md:text-5xl">{page.title}</h1>
      <div className="mt-8 grid gap-4 leading-relaxed">
        {page.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  );
}
