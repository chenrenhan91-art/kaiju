"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { QuantityPicker } from "@/components/QuantityPicker";
import { relatedProducts } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { COMPANY } from "@/lib/company";
import { money } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductView({ product }: { product: Product }) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const [active, setActive] = useState(0);
  const related = useMemo(() => relatedProducts(product), [product]);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  return (
    <div className="page-width py-10">
      <p className="text-sm mb-6">
        <Link href="/" className="underline">
          Home
        </Link>{" "}
        / {product.type}
      </p>
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <div className="relative aspect-square bg-cream-2">
            <Image src={product.images[active] ?? product.images[0]} alt={product.title} fill className="object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {product.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(i)}
                className={`relative aspect-square bg-cream-2 ${
                  i === active ? "ring-1 ring-brown" : ""
                }`}
              >
                <Image src={src} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs tracking-wide">{product.type}</p>
          <h1 className="display text-4xl mt-2">{product.title}</h1>
          {product.rating ? (
            <p className="mt-2 text-sm">
              {product.rating.toFixed(1)} / 5.0 ({product.reviewCount} reviews)
            </p>
          ) : null}
          <p className="mt-4 text-xl">{money(variant.price)}</p>
          <p className="mt-4 leading-relaxed">{product.blurb}</p>
          {product.variants.length > 1 ? (
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">
                {Object.keys(product.variants[0].options)[0] ?? "Option"}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariantId(v.id)}
                    className={`px-3 py-2 text-sm border ${
                      v.id === variantId ? "border-brown bg-brown text-white" : "border-brown/30"
                    }`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantityPicker value={qty} onChange={setQty} />
            <button type="button" className="btn btn-primary" onClick={() => add(product.handle, variant.id, qty)}>
              Add to cart
            </button>
          </div>
          <p className="mt-4 text-sm text-brown-soft">
            First-order code {COMPANY.promoCode} takes 10% off at checkout. Orders are confirmed by phone.
          </p>

          <details className="mt-8 border-t border-brown/15 py-4" open>
            <summary className="font-bold cursor-pointer">Product Details</summary>
            <p className="mt-3 leading-relaxed">{product.description}</p>
          </details>
          <details className="border-t border-brown/15 py-4">
            <summary className="font-bold cursor-pointer">Key Features</summary>
            <ul className="mt-3 grid gap-2 list-disc pl-5">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </details>
          <details className="border-t border-brown/15 py-4">
            <summary className="font-bold cursor-pointer">Product Specs</summary>
            <dl className="mt-3 grid gap-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 text-sm">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </details>
          <details className="border-t border-brown/15 py-4">
            <summary className="font-bold cursor-pointer">Care & Notes</summary>
            <p className="mt-3 leading-relaxed">{product.care}</p>
          </details>
          <details className="border-t border-b border-brown/15 py-4">
            <summary className="font-bold cursor-pointer">Shipping & Delivery</summary>
            <p className="mt-3 leading-relaxed">
              Free tracked shipping on all orders. After you submit checkout, we call {COMPANY.phone} or the
              number you provide to confirm stock, address, and payment.
            </p>
          </details>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="display text-3xl mb-8">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {related.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
