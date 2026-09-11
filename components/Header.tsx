"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bag, CaretDown, List, MagnifyingGlass, X } from "@phosphor-icons/react";
import { COMPANY } from "@/lib/company";
import { mainNav } from "@/lib/nav";
import { useCart } from "@/lib/cart";

const announcements = [
  <>
    10% Off Your First Order! Use Code: <strong>{COMPANY.promoCode}</strong>
  </>,
  <>Timeless quality that matures beautifully.</>,
];

export function Header() {
  const { count, setDrawerOpen, setSearchOpen } = useCart();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [announcement, setAnnouncement] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setAnnouncement((i) => (i + 1) % announcements.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="sticky top-0 z-40">
      <div className="bg-forest text-ivory">
        <div className="page-width flex items-center justify-between gap-4 py-[0.55rem] text-[13px]">
          <p className="flex-1 text-center md:text-left text-[11px] md:text-[13px] truncate md:whitespace-normal">
            {announcements[announcement]}
          </p>
          <span className="hidden md:inline whitespace-nowrap opacity-90">USD $ · EN</span>
        </div>
      </div>
      <header className="bg-cream text-brown border-b border-brown/10">
        <div className="page-width grid grid-cols-[auto_minmax(0,1fr)_auto] items-center h-[72px] md:h-[78px] gap-3">
          <div className="flex items-center min-w-0">
            <button
              type="button"
              className="lg:hidden p-2 -ml-2"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <List size={26} />
            </button>
            <Link href="/" className="shrink-0">
              <span className="display text-[22px] sm:text-[24px] md:text-[30px] tracking-[0.1em] md:tracking-[0.18em]">
                {COMPANY.brand}
              </span>
            </Link>
          </div>
          <nav className="hidden lg:flex items-center justify-start gap-5 min-w-0" onMouseLeave={() => setOpenMenu(null)}>
            {mainNav.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
              >
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 text-[13.5px] font-medium py-6 whitespace-nowrap"
                >
                  {item.label}
                  {item.children ? <CaretDown size={12} /> : null}
                </Link>
                {item.children && openMenu === item.label ? (
                  <div className="absolute left-0 top-full min-w-[240px] bg-cream border border-brown/10 shadow-[0_12px_40px_rgba(122,92,70,0.12)] py-3 z-10">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-[13.5px] hover:bg-cream-2"
                        onClick={() => setOpenMenu(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-0.5">
            <button
              type="button"
              className="p-2"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <MagnifyingGlass size={22} />
            </button>
            <button
              type="button"
              className="p-2 relative"
              aria-label="Cart"
              onClick={() => setDrawerOpen(true)}
            >
              <Bag size={22} />
              {count > 0 ? (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-brown text-white text-[10px] leading-[18px] text-center px-1">
                  {count}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-forest/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[min(100%,360px)] bg-cream overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-6">
              <span className="display tracking-[0.18em] text-xl">{COMPANY.brand}</span>
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close">
                <X size={24} />
              </button>
            </div>
            {mainNav.map((item) => (
              <div key={item.label} className="border-b border-brown/10 py-3">
                <Link
                  href={item.href}
                  className="font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="mt-2 grid gap-1 pl-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="text-sm py-1 text-brown-soft"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
