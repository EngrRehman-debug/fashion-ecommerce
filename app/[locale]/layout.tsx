import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Overlays from "@/components/Overlays";
import NavigationLoader from "@/components/NavigationLoader";
import { Suspense } from "react";
import JsonLd from "@/components/JsonLd";
import { CartProvider } from "@/lib/cart";
import { I18nProvider } from "@/lib/i18n/client";
import { LOCALES, LOCALE_TAG, OG_LOCALE } from "@/lib/i18n/config";
import { initLocale, toLocale, type LocaleParams } from "@/lib/i18n/server";
import { getTranslator } from "@/lib/i18n/translator";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { BRAND_NAME, SITE_URL } from "@/lib/site";

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

/** Both languages are generated at build time; any other first segment is a 404. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = toLocale((await params).locale);
  const { m } = getTranslator(locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: m.site.title, template: `%s | ${BRAND_NAME}` },
    description: m.site.description,
    applicationName: BRAND_NAME,
    keywords: [...m.site.keywords, BRAND_NAME],
    alternates: { canonical: "/" },
    openGraph: {
      siteName: BRAND_NAME,
      locale: OG_LOCALE[locale],
      type: "website",
      title: m.site.title,
      description: m.site.description,
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#15171B",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: LocaleParams & { children: React.ReactNode }) {
  const t = await initLocale(params);
  return (
    <html lang={LOCALE_TAG[t.locale]} className={`${sans.variable} ${serif.variable}`}>
      <body className="font-sans text-[15px] sm:text-base" suppressHydrationWarning>
        <JsonLd data={[organizationSchema(t.locale), websiteSchema(t.locale)]} />
        <I18nProvider locale={t.locale}>
          <CartProvider>
            <a
              href="#main"
              className="sr-only z-[100] bg-ink px-4 py-3 text-cream-light focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            >
              {t.m.common.skipToContent}
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
        </I18nProvider>
      </body>
    </html>
  );
}
