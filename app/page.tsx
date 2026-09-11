import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ProductCard } from "@/components/ProductCard";
import {
  combFeatured,
  collections,
  ideas,
  jewelryTypeHandles,
  mirrorFeatured,
  products,
  reviews,
  styleHandles,
  vanityFeatured,
} from "@/lib/catalog";

function byHandle(handle: string) {
  return products.find((p) => p.handle === handle)!;
}

function collectionBy(handle: string) {
  return collections.find((c) => c.handle === handle)!;
}

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[500px] md:min-h-[660px] text-ivory">
        <Image
          src="/images/hero-banner.png"
          alt="Wooden jewelry boxes and vanity pieces arranged on a sunlit dressing table"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest/25" />
        <div className="relative page-width min-h-[500px] md:min-h-[660px] flex items-center">
          <div className="max-w-xl py-16">
            <h1 className="display text-[2.15rem] md:text-6xl text-ivory text-balance">
              Timeless Storage For Daily Rituals
            </h1>
            <p className="mt-5 text-lg md:text-xl max-w-[28ch]">
              Solid wood. Thoughtful storage. Designed for everyday life.
            </p>
            <Link href="/collections/all-products" className="btn btn-ivory mt-8">
              Explore More
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream-2">
        <div className="page-width py-16 md:py-20 text-center">
          <h2 className="display italic text-[1.65rem] md:text-5xl pb-1 text-balance">
            A Place Your Daily Pieces Return To.
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-[36ch] mx-auto">
            We invite you to bring order, care, and calm into everyday rituals.
          </p>
        </div>
      </section>

      <section>
        <div className="page-width py-14 text-center max-w-3xl mx-auto">
          <h2 className="display text-3xl md:text-4xl">Beauty In Every Detail</h2>
          <p className="mt-4 text-[17px] leading-relaxed">
            Explore the thoughtful storage, considered structure, and practical details designed to
            bring beauty, ease, and order to your daily routine.
          </p>
        </div>
      </section>

      <section className="pb-6">
        <div className="page-width">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="display text-3xl md:text-4xl">Jewelry Boxes for Everyday Pieces</h2>
              <p className="mt-3 max-w-xl">
                Designed to keep necklaces flat, rings separated, and earrings easy to find.
              </p>
            </div>
            <Link href="/collections/jewelry-boxes" className="hidden md:inline-flex btn btn-primary">
              Shop All Jewelry Boxes
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {jewelryTypeHandles.map((handle) => {
              const col = collectionBy(handle);
              return (
                <Link key={handle} href={`/collections/${handle}`} className="group">
                  <span className="relative block aspect-square bg-cream-2 overflow-hidden">
                    <Image src={col.image} alt="" fill className="object-cover group-hover:scale-[1.03] transition duration-500" />
                  </span>
                  <span className="block mt-3 text-center text-sm font-medium">{col.title}</span>
                </Link>
              );
            })}
          </div>
          <div className="md:hidden mt-6 text-center">
            <Link href="/collections/jewelry-boxes" className="btn btn-primary">
              Shop All Jewelry Boxes
            </Link>
          </div>
        </div>
      </section>

      <FeaturedRow
        title="Vanity & Dressing Storage"
        subtitle="For keeping things in place."
        href="/collections/vanity-dressing-storage"
        handles={vanityFeatured}
      />
      <FeaturedRow
        title="Mirrors"
        subtitle="For getting ready, anywhere."
        href="/collections/mirror"
        handles={mirrorFeatured}
      />
      <FeaturedRow
        title="Combs"
        subtitle="For simple hair care."
        href="/collections/comb"
        handles={combFeatured}
      />

      <section className="py-16">
        <div className="page-width">
          <h2 className="display text-3xl md:text-4xl text-center mb-3">Shop By Style</h2>
          <p className="text-center mb-10">By form and tone.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {styleHandles.map((handle) => {
              const col = collectionBy(handle);
              return (
                <Link key={handle} href={`/collections/${handle}`} className="group">
                  <span className="relative block aspect-square bg-cream-2 overflow-hidden">
                    <Image src={col.image} alt="" fill className="object-cover group-hover:scale-[1.03] transition duration-500" />
                  </span>
                  <span className="block mt-3 text-center font-medium">{col.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="page-width py-10 text-center">
          <h2 className="display text-3xl md:text-4xl">We Take Care of the Details</h2>
          <p className="mt-3">Giving everyday pieces a place that truly feels like home.</p>
        </div>
      </section>

      <section className="pb-16">
        <div className="page-width grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[3/2] bg-cream-2">
            <Image src="/images/about-workshop.png" alt="Hardwood boards and tools on a workshop table" fill className="object-cover" />
          </div>
          <div className="max-w-md md:px-6">
            <p className="text-[17px] leading-relaxed">
              KAIJU is the storefront of KAIJU TRADE LIMITED. We source and finish solid hardwood
              jewelry boxes, vanity storage, mirrors, and combs for daily use.
            </p>
            <p className="mt-4 text-[17px] leading-relaxed">
              Step into About Us to read how materials, packing, and Hong Kong dispatch come together.
            </p>
            <Link href="/about" className="btn btn-primary mt-8">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="page-width">
          <h2 className="display text-3xl text-center mb-10">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((r) => (
              <blockquote key={r.name} className="bg-cream-2 p-6">
                <p className="text-[15px] leading-relaxed">“{r.quote}”</p>
                <footer className="mt-4 text-sm font-medium">
                  {r.name} - {r.location}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="page-width">
          <div className="flex items-end justify-between mb-8">
            <h2 className="display text-3xl md:text-4xl">Wooden Living Ideas</h2>
            <Link href="/ideas" className="text-sm underline">
              View more
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <Link key={idea.slug} href={`/ideas/${idea.slug}`} className="group">
                <span className="relative block aspect-[4/3] bg-cream-2 overflow-hidden">
                  <Image src={idea.image} alt="" fill className="object-cover" />
                </span>
                <span className="block mt-3 font-medium group-hover:underline">{idea.title}</span>
                <span className="block mt-1 text-sm text-brown-soft">{idea.excerpt}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FeaturedRow({
  title,
  subtitle,
  href,
  handles,
}: {
  title: string;
  subtitle: string;
  href: string;
  handles: string[];
}) {
  return (
    <section className="py-10">
      <div className="page-width">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="display text-3xl md:text-4xl">{title}</h2>
            <p className="mt-2">{subtitle}</p>
          </div>
          <Link href={href} className="hidden md:inline text-sm underline">
            Shop All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
          {handles.map((handle) => (
            <ProductCard key={handle} product={byHandle(handle)} />
          ))}
        </div>
        <div className="md:hidden mt-8 text-center">
          <Link href={href} className="btn btn-outline">
            Explore more Shop All
          </Link>
        </div>
      </div>
    </section>
  );
}
