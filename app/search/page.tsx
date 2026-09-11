"use client";

import { Suspense, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { searchProducts } from "@/lib/catalog";

function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const results = useMemo(() => searchProducts(q), [q]);

  return (
    <div className="page-width py-12">
      <h1 className="display text-4xl">Search</h1>
      <form
        className="mt-6 max-w-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const value = String(new FormData(e.currentTarget).get("q") || "");
          router.push(`/search?q=${encodeURIComponent(value)}`);
        }}
      >
        <input name="q" defaultValue={q} className="input" placeholder="Search jewelry box, mirror, organizer" />
      </form>
      <p className="mt-4 text-sm">
        {q.trim() ? `${results.length} results for “${q}”` : "Enter a search term."}
      </p>
      <div className="mt-8">
        <ProductGrid products={results} />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
