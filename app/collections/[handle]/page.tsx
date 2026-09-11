import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { collections, getCollection, productsInCollection } from "@/lib/catalog";

export function generateStaticParams() {
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) return { title: "Collection" };
  return { title: collection.title, description: collection.description };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = getCollection(handle);
  if (!collection) notFound();
  const items = productsInCollection(handle);

  return (
    <div className="page-width py-12">
      <p className="text-sm mb-3">
        <Link href="/" className="underline">
          Home
        </Link>{" "}
        / {collection.title}
      </p>
      <h1 className="display text-4xl md:text-5xl">{collection.title}</h1>
      <p className="mt-4 max-w-2xl">{collection.description}</p>
      <p className="mt-2 text-sm text-brown-soft">{items.length} products</p>
      <div className="mt-10">
        <ProductGrid products={items} />
      </div>
    </div>
  );
}
