"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { searchProducts } from "@/lib/catalog";
import { moneyShort } from "@/lib/format";
import { useCart } from "@/lib/cart";

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!searchOpen) setQ("");
  }, [searchOpen]);

  const results = useMemo(() => searchProducts(q).slice(0, 8), [q]);
  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-forest/40" aria-label="Close search" onClick={() => setSearchOpen(false)} />
      <div className="relative bg-cream">
        <form
          className="page-width flex items-center gap-3 py-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSearchOpen(false);
            router.push(`/search?q=${encodeURIComponent(q.trim())}`);
          }}
        >
          <MagnifyingGlass size={22} />
          <input
            name="q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jewelry box, mirror, organizer"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-brown-soft"
            autoFocus
          />
          <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close">
            <X size={22} />
          </button>
        </form>
        {q.trim() ? (
          <div className="page-width pb-8 grid gap-3">
            {results.length === 0 ? <p className="text-sm">No matches.</p> : null}
            {results.map((p) => (
              <Link
                key={p.handle}
                href={`/products/${p.handle}`}
                className="flex items-center gap-3 py-2"
                onClick={() => setSearchOpen(false)}
              >
                <span className="relative w-14 h-14 bg-cream-2 shrink-0">
                  <Image src={p.images[0]} alt="" fill className="object-cover" />
                </span>
                <span>
                  <span className="block text-sm">{p.title}</span>
                  <span className="text-xs">{moneyShort(p.variants[0].price)} USD</span>
                </span>
              </Link>
            ))}
            <Link href={`/search?q=${encodeURIComponent(q)}`} className="text-sm underline" onClick={() => setSearchOpen(false)}>
              View all results
            </Link>
          </div>
        ) : (
          <div className="page-width pb-8 flex gap-4 text-sm">
            {["jewelry box", "mirror", "organizer"].map((term) => (
              <Link key={term} href={`/search?q=${encodeURIComponent(term)}`} onClick={() => setSearchOpen(false)}>
                {term}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
