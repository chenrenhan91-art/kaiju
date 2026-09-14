import Image from "next/image";
import { COMPANY } from "@/lib/company";
import { asset } from "@/lib/asset";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div>
      <section className="page-width py-14 md:py-20 max-w-3xl">
        <h1 className="display text-4xl md:text-6xl">KAIJU TRADE LIMITED</h1>
        <p className="mt-6 text-lg leading-relaxed">
          KAIJU is the storefront for solid hardwood jewelry boxes, vanity storage, mirrors, and
          combs. The company is registered in Hong Kong as {COMPANY.legalName}.
        </p>
      </section>

      <section className="page-width grid md:grid-cols-2 gap-10 pb-16 items-center">
        <div className="relative aspect-[4/3] bg-cream-2">
          <Image src={asset("/images/about-workshop.png")} alt="Workshop table with hardwood boards" fill className="object-cover" />
        </div>
        <div>
          <h2 className="display text-3xl">How we work</h2>
          <p className="mt-4 leading-relaxed">
            Pieces are inspected for finish, structure, and function, then packed before they leave.
            Orders are reviewed daily. We confirm each order by phone or email so size, wood, and
            shipping details are clear before payment.
          </p>
        </div>
      </section>

      <section className="bg-cream-2">
        <div className="page-width grid md:grid-cols-2 gap-10 py-16 items-center">
          <div>
            <h2 className="display text-3xl">Materials and craft</h2>
            <p className="mt-4 leading-relaxed">
              We work with solid hardwoods such as black walnut, beech, cherry, and rosewood. Each
              piece is cut, assembled, sanded, and finished for a smooth surface and a precise fit.
              Quality should be felt the moment you open the box.
            </p>
          </div>
          <div className="relative aspect-[4/3] bg-cream">
            <Image src={asset("/images/about-grain.png")} alt="Close walnut and cherry grain" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="page-width py-16 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="display text-3xl">Company information</h2>
          <p className="mt-5 font-bold">{COMPANY.legalName}</p>
          <p className="mt-3 whitespace-pre-line leading-relaxed">
            {COMPANY.addressLines.join("\n")}
          </p>
          <p className="mt-3">
            Phone:{" "}
            <a href={COMPANY.phoneHref} className="underline">
              {COMPANY.phone}
            </a>
          </p>
          <p className="mt-3">
            Email:{" "}
            <a href={COMPANY.emailHref} className="underline break-all">
              {COMPANY.email}
            </a>
          </p>
        </div>
        <div>
          <h2 className="display text-3xl">Get in touch</h2>
          <p className="mt-4 leading-relaxed">
            Call or email with questions about a piece, a bulk order, or an existing checkout
            request. We reply on the phone number or email you leave at checkout.
          </p>
        </div>
      </section>
    </div>
  );
}
