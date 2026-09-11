"use client";

import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { QuantityPicker } from "@/components/QuantityPicker";

export default function CartPage() {
  const { lines, subtotal, setQty, remove } = useCart();

  return (
    <div className="page-width py-12">
      <h1 className="display text-4xl">Your cart</h1>
      {lines.length === 0 ? (
        <div className="py-16 text-center">
          <p>Your cart is empty.</p>
          <Link href="/collections/all-products" className="btn btn-primary mt-6">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid lg:grid-cols-[1fr_320px] gap-10">
          <ul className="grid gap-6">
            {lines.map((line) => {
              const product = getProduct(line.productHandle);
              const variant = product?.variants.find((v) => v.id === line.variantId);
              if (!product || !variant) return null;
              return (
                <li key={`${line.productHandle}-${line.variantId}`} className="flex gap-4 border-b border-brown/10 pb-6">
                  <Link href={`/products/${product.handle}`} className="relative w-28 h-28 bg-cream-2 shrink-0">
                    <Image src={product.images[0]} alt="" fill className="object-cover" />
                  </Link>
                  <div className="flex-1">
                    <Link href={`/products/${product.handle}`} className="font-medium">
                      {product.title}
                    </Link>
                    {variant.title !== "Default" ? (
                      <p className="text-sm text-brown-soft mt-1">{variant.title}</p>
                    ) : null}
                    <p className="mt-2">{money(variant.price)}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <QuantityPicker
                        value={line.quantity}
                        onChange={(n) => setQty(line.productHandle, line.variantId, n)}
                      />
                      <button type="button" className="text-sm underline" onClick={() => remove(line.productHandle, line.variantId)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="hidden md:block">{money(variant.price * line.quantity)}</p>
                </li>
              );
            })}
          </ul>
          <aside className="bg-cream-2 p-6 h-fit">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <p className="text-sm mt-3 text-brown-soft">
              Shipping is included. Payment is arranged after we confirm the order by phone.
            </p>
            <Link href="/checkout" className="btn btn-primary w-full mt-6">
              Check out
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
