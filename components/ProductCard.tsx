"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { moneyShort } from "@/lib/format";
import { QuickView } from "./QuickView";

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const price = Math.min(...product.variants.map((v) => v.price));
  const from = product.variants.length > 1;
  const hover = product.images[1] ?? product.images[0];

  return (
    <>
      <article className="group">
        <div className="relative aspect-square bg-cream-2 overflow-hidden">
          <Link href={`/products/${product.handle}`} className="block h-full">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            <Image
              src={hover}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute left-3 right-3 bottom-3 bg-cream/95 text-brown text-[13px] font-bold py-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition"
          >
            Quick view
          </button>
        </div>
        <div className="pt-3 text-center">
          <p className="text-[12px] tracking-wide text-brown-soft">{product.type}</p>
          <h3 className="mt-1 text-[15px] leading-snug">
            <Link href={`/products/${product.handle}`}>{product.title}</Link>
          </h3>
          <p className="mt-1 text-[14px]">
            {from ? "From " : ""}
            {moneyShort(price)} USD
          </p>
          {product.rating ? (
            <p className="mt-1 text-[12px]">
              {product.rating.toFixed(1)} / 5.0 ({product.reviewCount})
            </p>
          ) : null}
        </div>
      </article>
      {open ? <QuickView product={product} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return <p className="text-center py-20">No pieces in this collection yet.</p>;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
      {products.map((p) => (
        <ProductCard key={p.handle} product={p} />
      ))}
    </div>
  );
}
