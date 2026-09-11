"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct } from "./catalog";
import { COMPANY } from "./company";
import type { CartLine, OrderRecord } from "./types";

const CART_KEY = "kaiju-cart";
const ORDERS_KEY = "kaiju-orders";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  searchOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  add: (productHandle: string, variantId: string, quantity?: number) => void;
  setQty: (productHandle: string, variantId: string, quantity: number) => void;
  remove: (productHandle: string, variantId: string) => void;
  clear: () => void;
  placeOrder: (input: Omit<OrderRecord, "id" | "createdAt" | "lines" | "subtotal" | "discount" | "total">) => OrderRecord;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadLines(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setLines(loadLines());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const add = useCallback((productHandle: string, variantId: string, quantity = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.productHandle === productHandle && l.variantId === variantId);
      if (found) {
        return prev.map((l) =>
          l === found ? { ...l, quantity: l.quantity + quantity } : l,
        );
      }
      return [...prev, { productHandle, variantId, quantity }];
    });
    setDrawerOpen(true);
  }, []);

  const setQty = useCallback((productHandle: string, variantId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity < 1) {
        return prev.filter((l) => !(l.productHandle === productHandle && l.variantId === variantId));
      }
      return prev.map((l) =>
        l.productHandle === productHandle && l.variantId === variantId ? { ...l, quantity } : l,
      );
    });
  }, []);

  const remove = useCallback((productHandle: string, variantId: string) => {
    setLines((prev) => prev.filter((l) => !(l.productHandle === productHandle && l.variantId === variantId)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const subtotal = useMemo(() => {
    return lines.reduce((sum, line) => {
      const product = getProduct(line.productHandle);
      const variant = product?.variants.find((v) => v.id === line.variantId);
      if (!variant) return sum;
      return sum + variant.price * line.quantity;
    }, 0);
  }, [lines]);

  const count = useMemo(() => lines.reduce((n, l) => n + l.quantity, 0), [lines]);

  const placeOrder = useCallback(
    (input: Omit<OrderRecord, "id" | "createdAt" | "lines" | "subtotal" | "discount" | "total">) => {
      const detailed = lines
        .map((line) => {
          const product = getProduct(line.productHandle);
          const variant = product?.variants.find((v) => v.id === line.variantId);
          if (!product || !variant) return null;
          return {
            title: product.title,
            variantTitle: variant.title,
            quantity: line.quantity,
            price: variant.price,
            image: product.images[0],
            handle: product.handle,
          };
        })
        .filter(Boolean) as OrderRecord["lines"];

      const sub = detailed.reduce((s, l) => s + l.price * l.quantity, 0);
      const code = input.promoCode?.trim().toUpperCase();
      const discountPercent =
        code === COMPANY.promoCode ? COMPANY.promoPercent : input.discountPercent;
      const discount = +(sub * (discountPercent / 100)).toFixed(2);
      const total = +(sub - discount).toFixed(2);
      const order: OrderRecord = {
        ...input,
        discountPercent,
        id: `KJ-${Date.now().toString(36).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        lines: detailed,
        subtotal: sub,
        discount,
        total,
      };
      const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]") as OrderRecord[];
      localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...existing]));
      localStorage.setItem("kaiju-last-order", JSON.stringify(order));
      setLines([]);
      return order;
    },
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      drawerOpen,
      searchOpen,
      setDrawerOpen,
      setSearchOpen,
      add,
      setQty,
      remove,
      clear,
      placeOrder,
    }),
    [lines, count, subtotal, drawerOpen, searchOpen, add, setQty, remove, clear, placeOrder],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function loadLastOrder(): OrderRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("kaiju-last-order");
    return raw ? (JSON.parse(raw) as OrderRecord) : null;
  } catch {
    return null;
  }
}
