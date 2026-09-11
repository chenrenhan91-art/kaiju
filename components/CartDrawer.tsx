"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "@phosphor-icons/react";
import { getProduct } from "@/lib/catalog";
import { money } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { QuantityPicker } from "./QuantityPicker";

export function CartDrawer() {
  const { lines, subtotal, drawerOpen, setDrawerOpen, setQty, remove } = useCart();
  if (!drawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-forest/40"
        aria-label="Close cart"
        onClick={() => setDrawerOpen(false)}
      />
      <aside className="absolute right-0 inset-y-0 w-[min(100%,420px)] bg-cream flex flex-col">
        <div className="flex items-center justify-between px-5 h-16 border-b border-brown/10">
          <h2 className="font-bold">Cart</h2>
          <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close">
            <X size={22} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="py-10 text-center text-sm">Your cart is empty.</p>
          ) : (
            <ul className="grid gap-5">
              {lines.map((line) => {
                const product = getProduct(line.productHandle);
                const variant = product?.variants.find((v) => v.id === line.variantId);
                if (!product || !variant) return null;
                return (
                  <li key={`${line.productHandle}-${line.variantId}`} className="flex gap-3">
                    <Link
                      href={`/products/${product.handle}`}
                      className="relative w-20 h-20 bg-cream-2 shrink-0"
                      onClick={() => setDrawerOpen(false)}
                    >
                      <Image src={product.images[0]} alt="" fill className="object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm leading-snug">{product.title}</p>
                      {variant.title !== "Default" ? (
                        <p className="text-xs text-brown-soft mt-0.5">{variant.title}</p>
                      ) : null}
                      <p className="text-sm mt-1">{money(variant.price)}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <QuantityPicker
                          value={line.quantity}
                          onChange={(n) => setQty(line.productHandle, line.variantId, n)}
                        />
                        <button
                          type="button"
                          className="text-xs underline"
                          onClick={() => remove(line.productHandle, line.variantId)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="border-t border-brown/10 p-5 grid gap-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{money(subtotal)}</span>
          </div>
          <p className="text-xs text-brown-soft">Shipping and payment are confirmed by phone after you place the order.</p>
          <Link href="/cart" className="btn btn-outline" onClick={() => setDrawerOpen(false)}>
            View cart
          </Link>
          <Link
            href="/checkout"
            className={`btn btn-primary ${lines.length === 0 ? "pointer-events-none opacity-50" : ""}`}
            onClick={() => setDrawerOpen(false)}
          >
            Check out
          </Link>
        </div>
      </aside>
    </div>
  );
}
