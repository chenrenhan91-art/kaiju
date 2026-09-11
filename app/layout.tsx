import type { Metadata } from "next";
import { Inter, Libre_Caslon_Text } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import { COMPANY } from "@/lib/company";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-caslon",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${COMPANY.brand} | Wooden Jewelry Boxes & Lifestyle Collection`,
    template: `%s - ${COMPANY.brand}`,
  },
  description:
    "Solid wood jewelry boxes, vanity storage, mirrors, and combs. KAIJU TRADE LIMITED, Hong Kong.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${caslon.variable} h-full`}>
      <body className={`${inter.className} min-h-full flex flex-col bg-cream text-brown antialiased`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
