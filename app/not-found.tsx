import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** A few pieces from across the ranges, so a dead end still leads somewhere. */
const PICKS = CATEGORIES.map((c) => PRODUCTS.find((p) => p.category === c.id)).filter(
  (p): p is (typeof PRODUCTS)[number] => Boolean(p)
);

export default function NotFound() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <p
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[48vw] italic leading-none text-ink/[0.05] lg:text-[34vw]"
        >
          404
        </p>
        <Reveal className="container-lux relative flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-6 max-w-3xl font-serif text-[3rem] font-medium leading-[0.95] text-ink sm:text-display-lg">
            This print has <em className="text-primary">slipped away</em>
          </h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink-soft">
            The page you’re looking for doesn’t exist, or the piece has found its owner. Every design
            is one of one — let’s find you another.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="btn-primary">
              <span>Shop the collection</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/" className="btn-outline">
              <span>Back home</span>
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="bg-cream-light py-20">
        <div className="container-lux">
          <p className="eyebrow">You might like</p>
          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-6">
            {PICKS.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
