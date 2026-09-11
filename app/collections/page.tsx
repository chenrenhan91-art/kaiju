import Image from "next/image";
import Link from "next/link";
import { collections } from "@/lib/catalog";

export const metadata = { title: "Collections" };

export default function CollectionsIndexPage() {
  return (
    <div className="page-width py-12">
      <h1 className="display text-4xl md:text-5xl">Explore More</h1>
      <p className="mt-3 max-w-xl">Browse jewelry boxes, vanity storage, mirrors, combs, and styles.</p>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collections
          .filter((c) => c.handle !== "all-products")
          .map((c) => (
            <Link key={c.handle} href={`/collections/${c.handle}`} className="group">
              <span className="relative block aspect-square bg-cream-2 overflow-hidden">
                <Image src={c.image} alt="" fill className="object-cover" />
              </span>
              <span className="block mt-3 font-medium group-hover:underline">{c.title}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}
