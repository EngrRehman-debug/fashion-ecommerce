import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { ArrowRight } from "@/components/icons";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { getT } from "@/lib/i18n/server";
import { rich } from "@/lib/i18n/rich";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: getT().m.notFound.metaTitle,
    robots: { index: false, follow: true },
  };
}

/** A few pieces from across the ranges, so a dead end still leads somewhere. */
const PICKS = CATEGORIES.map((c) => PRODUCTS.find((p) => p.category === c.id)).filter(
  (p): p is (typeof PRODUCTS)[number] => Boolean(p)
);

/**
 * Not-found pages get no params, so the language is whatever the layout set
 * for this request (getT()) — the layout always renders first here.
 */
export default function NotFound() {
  const t = getT();
  const n = t.m.notFound;
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
          <p className="eyebrow">{n.eyebrow}</p>
          <h1 className="mt-6 max-w-3xl font-serif text-[3rem] font-medium leading-[0.95] text-ink sm:text-display-lg">
            {rich(n.title)}
          </h1>
          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink-soft">{n.body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="btn-primary">
              <span>{t.m.common.shopCollection}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/" className="btn-outline">
              <span>{t.m.common.backHome}</span>
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="bg-cream-light py-20">
        <div className="container-lux">
          <p className="eyebrow">{n.youMightLike}</p>
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
