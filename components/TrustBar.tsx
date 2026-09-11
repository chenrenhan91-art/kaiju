import { ArrowClockwise, Phone, Truck } from "@phosphor-icons/react";
import { COMPANY } from "@/lib/company";

export function TrustBar() {
  const items = [
    {
      icon: Truck,
      title: "Free Shipping on All Orders",
      text: "Tracked shipping included with every order.",
    },
    {
      icon: ArrowClockwise,
      title: "60-Day Returns & Exchanges",
      text: "Simple returns on eligible items within 60 days.",
    },
    {
      icon: Phone,
      title: "Phone-Confirmed Orders",
      text: `We confirm stock and payment by phone at ${COMPANY.phone}.`,
    },
  ];
  return (
    <section className="bg-cream-2">
      <div className="page-width grid md:grid-cols-3 gap-8 py-12">
        {items.map((item) => (
          <div key={item.title} className="flex gap-4">
            <item.icon size={28} className="shrink-0" />
            <div>
              <p className="font-bold">{item.title}</p>
              <p className="text-sm mt-1 text-brown-soft">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
