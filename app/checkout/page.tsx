"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { COMPANY } from "@/lib/company";
import { getProduct } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";

export default function CheckoutPage() {
  const { lines, subtotal, placeOrder } = useCart();
  const router = useRouter();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState("");
  const [error, setError] = useState("");

  const discountPercent = applied === COMPANY.promoCode ? COMPANY.promoPercent : 0;
  const discount = useMemo(() => +(subtotal * (discountPercent / 100)).toFixed(2), [subtotal, discountPercent]);
  const total = +(subtotal - discount).toFixed(2);

  if (lines.length === 0) {
    return (
      <div className="page-width py-20 text-center">
        <p>Your cart is empty.</p>
        <Link href="/collections/all-products" className="btn btn-primary mt-6">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="page-width py-12 grid lg:grid-cols-[1fr_380px] gap-10">
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const order = placeOrder({
            name: String(data.get("name") || ""),
            phone: String(data.get("phone") || ""),
            country: String(data.get("country") || ""),
            address: String(data.get("address") || ""),
            city: String(data.get("city") || ""),
            postal: String(data.get("postal") || ""),
            notes: String(data.get("notes") || ""),
            promoCode: applied,
            discountPercent,
          });
          router.push(`/order/confirmed?id=${order.id}`);
        }}
      >
        <h1 className="display text-4xl">Checkout</h1>
        <p className="text-sm leading-relaxed text-brown-soft">
          No online payment on this site. After you submit, we call the phone number below to confirm
          stock and share payment instructions. Company line: {COMPANY.phone}.
        </p>
        <label className="grid gap-2 text-sm">
          Full name
          <input required name="name" className="input" autoComplete="name" />
        </label>
        <label className="grid gap-2 text-sm">
          Phone
          <input required name="phone" type="tel" className="input" autoComplete="tel" />
        </label>
        <label className="grid gap-2 text-sm">
          Country / region
          <input required name="country" className="input" autoComplete="country-name" />
        </label>
        <label className="grid gap-2 text-sm">
          Address
          <input required name="address" className="input" autoComplete="street-address" />
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="grid gap-2 text-sm">
            City
            <input required name="city" className="input" autoComplete="address-level2" />
          </label>
          <label className="grid gap-2 text-sm">
            Postal code
            <input required name="postal" className="input" autoComplete="postal-code" />
          </label>
        </div>
        <label className="grid gap-2 text-sm">
          Order notes (optional)
          <textarea name="notes" className="input min-h-24" />
        </label>
        <button type="submit" className="btn btn-primary justify-self-start mt-2">
          Place order
        </button>
      </form>

      <aside className="bg-cream-2 p-6 h-fit">
        <h2 className="font-bold mb-4">Order summary</h2>
        <ul className="grid gap-3">
          {lines.map((line) => {
            const product = getProduct(line.productHandle);
            const variant = product?.variants.find((v) => v.id === line.variantId);
            if (!product || !variant) return null;
            return (
              <li key={`${line.productHandle}-${line.variantId}`} className="flex gap-3">
                <span className="relative w-14 h-14 bg-cream shrink-0">
                  <Image src={product.images[0]} alt="" fill className="object-cover" />
                </span>
                <span className="flex-1 text-sm">
                  {product.title}
                  <span className="block text-xs">Qty {line.quantity}</span>
                </span>
                <span className="text-sm">{money(variant.price * line.quantity)}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-5 flex gap-2">
          <input
            className="input"
            placeholder="Discount code"
            value={promo}
            onChange={(e) => {
              setPromo(e.target.value);
              setError("");
            }}
          />
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => {
              const code = promo.trim().toUpperCase();
              if (code === COMPANY.promoCode) {
                setApplied(code);
                setError("");
              } else {
                setApplied("");
                setError("Code not recognized.");
              }
            }}
          >
            Apply
          </button>
        </div>
        {error ? <p className="text-sm mt-2">{error}</p> : null}
        {applied ? (
          <p className="text-sm mt-2">
            {applied} applied ({COMPANY.promoPercent}% off)
          </p>
        ) : null}
        <dl className="mt-5 grid gap-2 text-sm">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{money(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Discount</dt>
            <dd>-{money(discount)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>Free</dd>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-brown/15">
            <dt>Total</dt>
            <dd>{money(total)}</dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}
