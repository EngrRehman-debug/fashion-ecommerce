import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";
import NavigationLoader from "@/components/NavigationLoader";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { CartProvider } from "@/lib/cart";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { BRAND_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} — Handcrafted Batik for Men`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: BRAND_NAME,
  keywords: [
    "batik shirt",
    "men's batik",
    "Malaysian batik",
    "batik sarong",
    "hand-dyed batik",
    "baju batik lelaki",
    BRAND_NAME,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: BRAND_NAME,
    locale: "en_MY",
    type: "website",
    title: `${BRAND_NAME} — Handcrafted Batik for Men`,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#15171B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans text-[15px] sm:text-base" suppressHydrationWarning>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <CartProvider>
          <a
            href="#main"
            className="sr-only z-[100] bg-ink px-4 py-3 text-cream-light focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <Overlays />
          {/* useSearchParams needs a Suspense boundary */}
          <Suspense fallback={null}>
            <NavigationLoader />
          </Suspense>
        </CartProvider>
      </body>
    </html>
  );
}
