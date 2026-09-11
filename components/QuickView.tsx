"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { X } from "@phosphor-icons/react";
import type { Product } from "@/lib/types";
import { money } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { QuantityPicker } from "./QuantityPicker";

export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { add } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [qty, setQty] = useState(1);
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-forest/40" onClick={onClose} aria-label="Close" />
      <div className="absolute inset-x-4 top-[8vh] mx-auto max-w-4xl bg-cream max-h-[84vh] overflow-y-auto">
        <button type="button" className="absolute right-3 top-3 z-10 p-2" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-cream-2">
            <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-xs tracking-wide mb-2">{product.type}</p>
            <h2 className="display text-3xl">{product.title}</h2>
            <p className="mt-3 text-lg">{money(variant.price)}</p>
            <p className="mt-4 text-sm leading-relaxed">{product.blurb}</p>
            {product.variants.length > 1 ? (
              <div className="mt-5 grid gap-2">
                {Object.keys(product.variants[0].options).map((name) => (
                  <div key={name}>
                    <p className="text-sm font-medium mb-2">{name}</p>
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
                ))}
              </div>
            ) : null}
            <div className="mt-5 flex items-center gap-3">
              <QuantityPicker value={qty} onChange={setQty} />
              <button
                type="button"
                className="btn btn-primary flex-1"
                onClick={() => {
                  add(product.handle, variant.id, qty);
                  onClose();
                }}
              >
                Add to cart
              </button>
            </div>
            <Link href={`/products/${product.handle}`} className="mt-4 inline-block text-sm underline" onClick={onClose}>
              View full details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
