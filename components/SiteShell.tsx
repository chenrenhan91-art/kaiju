"use client";

import { CartProvider } from "@/lib/cart";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SearchModal } from "./SearchModal";
import { TrustBar } from "./TrustBar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <TrustBar />
      <Footer />
      <CartDrawer />
      <SearchModal />
    </CartProvider>
  );
}
