import Link from "next/link";
import { ChatCircle, Phone } from "@phosphor-icons/react";
import { COMPANY } from "@/lib/company";
import { footerPolicies, footerShop, footerSupport } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="mt-auto bg-cream text-brown">
      <div className="border-t border-brown/10">
        <div className="page-width grid gap-10 py-16 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="display tracking-[0.18em] text-2xl mb-4">{COMPANY.brand}</p>
            <p className="text-[15px] leading-relaxed max-w-[36ch]">{COMPANY.tagline}</p>
            <p className="mt-4 text-[14px] leading-relaxed max-w-[42ch] text-brown-soft">
              Crafted wooden jewelry boxes and everyday storage pieces made from solid hardwood,
              designed for calm rituals, thoughtful organization, and a quieter way of living.
            </p>
          </div>
          <div>
            <p className="font-bold mb-4">Shop {COMPANY.brand}</p>
            <ul className="grid gap-2 text-[14px]">
              {footerShop.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold mb-4">Get Support</p>
            <ul className="grid gap-2 text-[14px]">
              {footerSupport.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="font-bold mt-8 mb-4">Policies</p>
            <ul className="grid gap-2 text-[14px]">
              {footerPolicies.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold mb-3">Need any advice before you buy?</p>
            <p className="text-[14px] leading-relaxed mb-4">
              We confirm orders by phone. Call us with questions about wood, size, or shipping.
            </p>
            <a href={COMPANY.phoneHref} className="btn btn-primary w-full">
              <Phone size={18} />
              {COMPANY.phone}
            </a>
            <p className="mt-6 text-[13px] leading-relaxed whitespace-pre-line">
              {COMPANY.legalName}
              {"\n"}
              {COMPANY.addressLines.join("\n")}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-cream-2">
        <div className="page-width flex flex-col md:flex-row md:items-center gap-3 py-5 text-[13px]">
          <ChatCircle size={18} />
          <p>
            Questions about a piece? Call {COMPANY.phone}. We do not collect email.
          </p>
        </div>
      </div>
      <div className="page-width py-5 text-[12px] text-brown-soft flex flex-col md:flex-row md:justify-between gap-2">
        <p>
          © {new Date().getFullYear()}, {COMPANY.legalName}
        </p>
        <p>Hong Kong</p>
      </div>
    </footer>
  );
}
