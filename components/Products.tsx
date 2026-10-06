"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CATEGORIES, PRODUCTS, productsIn } from "@/lib/catalog";
import { useT } from "@/lib/i18n/client";
import { rich } from "@/lib/i18n/rich";
import { PRODUCT_GRID } from "@/lib/ui";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import { ArrowRight } from "./icons";

const COUNT = 12;

/**
 * Newest additions are appended to data/products.json, so "New In" takes the
 * latest of each range in turn — a mix rather than one range's back catalogue.
 */
function newIn() {
  const queues = CATEGORIES.map((c) => productsIn(c.id).reverse());
  const out = [];
  while (out.length < COUNT && queues.some((q) => q.length)) {
    for (const q of queues) if (q.length && out.length < COUNT) out.push(q.shift()!);
  }
  return out;
}

const TAB_PRODUCTS = [
  { id: "new", products: newIn() },
  ...CATEGORIES.map((c) => ({ id: c.id, products: productsIn(c.id).slice(0, COUNT) })),
].filter((t) => t.products.length > 0);

export default function Products() {
  const t = useT();
  const e = t.m.home.edit;
  const TABS = TAB_PRODUCTS.map((tab) => ({
    ...tab,
    label: tab.id === "new" ? e.newIn : t.category(CATEGORIES.find((c) => c.id === tab.id)!).name,
  }));
  const [tab, setTab] = useState(TABS[0].id);
  const active = TABS.find((t) => t.id === tab)!;
  const href = tab === "new" ? "/shop" : `/shop?category=${tab}`;

  return (
    <section id="collection" className="bg-white py-20 lg:py-28">
      <div className="container-lux">
        <SectionHeading
          eyebrow={e.eyebrow}
          title={rich(e.title)}
          action={
            <Link href={href} className="link-underline inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
              {e.viewAll(tab === "new" ? PRODUCTS.length : productsIn(tab).length)} <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        {/* Tabs */}
        {/* Swipeable on phones: edges fade to show there is more, and the chosen tab scrolls into view. */}
        <div
          role="tablist"
          aria-label={t.m.nav.ranges}
          className="no-scrollbar -mx-4 mt-10 flex snap-x gap-2 overflow-x-auto scroll-px-4 px-4 [mask-image:linear-gradient(to_right,transparent,#000_16px,#000_calc(100%-40px),transparent)] sm:mx-0 sm:px-0 sm:[mask-image:none]"
        >
          {TABS.map((tb) => (
            <button
              key={tb.id}
              role="tab"
              aria-selected={tb.id === tab}
              onClick={(ev) => {
                setTab(tb.id);
                ev.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
              }}
              className={`relative shrink-0 snap-start border px-4 py-2.5 text-[12px] sm:px-5 sm:py-3 sm:text-[13px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                tb.id === tab ? "border-ink bg-ink text-cream-light" : "border-line text-ink hover:border-ink"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-10 ${PRODUCT_GRID}`}
          >
            {active.products.map((p, i) => (
              // Show 10 on five-column screens so the last row is full.
              <div key={p.slug} className={i >= 10 ? "xl:hidden 2xl:block" : ""}>
                <ProductCard product={p} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 flex justify-center">
          <Link href={href} className="btn-primary">
            <span>{tab === "new" ? e.exploreCollection : e.explore(active.label)}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
