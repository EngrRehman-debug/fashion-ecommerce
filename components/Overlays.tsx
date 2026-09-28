"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CATEGORIES,
  cardPriceText,
  formatMYR,
  getCategory,
  searchProducts,
  thumb,
  type Product,
} from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import OptionPicker, { QtyStepper } from "./OptionPicker";
import Highlight from "./Highlight";
import { ArrowRight, BagIcon, CloseIcon, SearchIcon, TrashIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

/** All cart/search/quick-add overlays, mounted once in the root layout. */
export default function Overlays() {
  const { drawerOpen, closeDrawer, searchOpen, setSearchOpen, quickAdd, closeQuickAdd } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      closeDrawer();
      setSearchOpen(false);
      closeQuickAdd();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer, setSearchOpen, closeQuickAdd]);

  return (
    <>
      <AnimatePresence>{drawerOpen && <CartDrawer key="cart" />}</AnimatePresence>
      <AnimatePresence>{searchOpen && <SearchPanel key="search" />}</AnimatePresence>
      <AnimatePresence>{quickAdd && <QuickAdd key={quickAdd.slug} product={quickAdd} />}</AnimatePresence>
    </>
  );
}

function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
    />
  );
}

/* ------------------------------------------------------------------ cart */

function CartDrawer() {
  const { lines, count, subtotal, hasUnpriced, setQty, remove, closeDrawer } = useCart();

  return (
    <>
      <Backdrop onClick={closeDrawer} />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[460px] flex-col bg-cream-light shadow-drawer"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-serif text-2xl text-ink">
            Your Cart <span className="text-muted">({count})</span>
          </h2>
          <button onClick={closeDrawer} aria-label="Close cart" className="-mr-2 p-2 text-ink transition-transform hover:rotate-90">
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <BagIcon className="h-12 w-12 text-sand" />
            <p className="mt-5 font-serif text-2xl text-ink">Your cart is empty</p>
            <p className="mt-2 text-[15px] text-muted">Every print is one of one — find yours.</p>
            <Link href="/shop" onClick={closeDrawer} className="btn-primary mt-8">
              <span>Shop the collection</span>
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((l) => (
                <motion.li
                  key={l.key}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-4 py-5"
                >
                  <Link href={`/shop/${l.slug}`} onClick={closeDrawer} className="block w-24 shrink-0 overflow-hidden bg-cream">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumb(l.product.images[0])} alt={l.product.name} className="aspect-[3/4] w-full object-cover object-top" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <Link href={`/shop/${l.slug}`} onClick={closeDrawer} className="font-serif text-lg leading-tight text-ink hover:text-primary">
                          {l.product.name}
                        </Link>
                        <p className="mt-1 text-[13px] text-muted">
                          {l.option.label}
                          {l.size && ` · Size ${l.size}`}
                        </p>
                      </div>
                      <button onClick={() => remove(l.key)} aria-label={`Remove ${l.product.name}`} className="p-1 text-muted transition-colors hover:text-red-700">
                        <TrashIcon className="h-[18px] w-[18px]" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QtyStepper small value={l.qty} onChange={(n) => setQty(l.key, n)} />
                      <span className="text-[15px] font-medium text-ink">{formatMYR(l.total)}</span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>

            <footer className="border-t border-line bg-white px-6 py-6">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] font-medium uppercase tracking-[0.16em] text-ink-soft">Subtotal</span>
                <span className="font-serif text-2xl text-ink">{formatMYR(subtotal)}</span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                {hasUnpriced
                  ? "Some items are priced on request — we'll confirm the total on WhatsApp."
                  : "Shipping is confirmed with your order on WhatsApp."}
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Link href="/cart" onClick={closeDrawer} className="btn-outline px-4">
                  <span>View cart</span>
                </Link>
                <Link href="/checkout" onClick={closeDrawer} className="btn-primary px-4">
                  <span>Checkout</span>
                </Link>
              </div>
            </footer>
          </>
        )}
      </motion.aside>
    </>
  );
}

/* ------------------------------------------------------------- quick add */

function QuickAdd({ product }: { product: Product }) {
  const { add, closeQuickAdd, openDrawer } = useCart();
  const category = getCategory(product.category)!;
  const [option, setOption] = useState(category.options[0]);
  const [size, setSize] = useState<string | null>(null);
  const [tried, setTried] = useState(false);
  const missingSize = option.needsSize && !size;

  const submit = () => {
    setTried(true);
    if (missingSize) return;
    add({ slug: product.slug, optionId: option.id, size: option.needsSize ? size : null });
    closeQuickAdd();
    openDrawer();
  };

  return (
    <>
      <Backdrop onClick={closeQuickAdd} />
      <div className="pointer-events-none fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Add ${product.name} to cart`}
          className="pointer-events-auto relative grid max-h-[92svh] w-full max-w-3xl overflow-y-auto bg-cream-light shadow-card sm:grid-cols-[0.9fr_1.1fr]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <button onClick={closeQuickAdd} aria-label="Close" className="absolute right-3 top-3 z-10 bg-cream-light/90 p-2 text-ink transition-transform hover:rotate-90">
            <CloseIcon className="h-5 w-5" />
          </button>
          <div className="hidden bg-cream sm:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(product.images[0])} alt={product.name} className="h-full w-full object-cover object-top" />
          </div>
          <div className="p-6 sm:p-9">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">{category.name}</p>
            <h2 className="mt-2 font-serif text-3xl text-ink">{product.name}</h2>
            <p className="mt-1 text-[15px] text-muted">{product.motif}</p>
            <p className="mt-4 font-serif text-2xl text-ink">{formatMYR(option.price)}</p>

            <div className="mt-7">
              <OptionPicker
                category={category}
                option={option}
                onOption={(o) => setOption(o)}
                size={size}
                onSize={setSize}
                sizeError={tried && missingSize}
              />
            </div>

            <button onClick={submit} className="btn-primary mt-8 w-full">
              <BagIcon className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
            <Link
              href={`/shop/${product.slug}`}
              onClick={closeQuickAdd}
              className="link-underline mt-5 inline-block text-[13px] font-medium uppercase tracking-[0.16em] text-ink"
            >
              View full details
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- search */

function SearchPanel() {
  const { setSearchOpen } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchProducts(q), [q]);
  const close = () => setSearchOpen(false);

  useEffect(() => input.current?.focus(), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    close();
    router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <>
      <Backdrop onClick={close} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search products"
        className="fixed inset-x-0 top-0 z-[70] max-h-[90svh] overflow-y-auto bg-cream-light shadow-card"
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="container-lux py-6 sm:py-10">
          <form onSubmit={submit} className="flex items-center gap-4 border-b-2 border-ink pb-3">
            <SearchIcon className="h-6 w-6 shrink-0 text-ink sm:h-7 sm:w-7" />
            <input
              ref={input}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search prints, colours, ranges…"
              aria-label="Search"
              className="min-w-0 flex-1 bg-transparent font-serif text-2xl text-ink outline-none placeholder:text-muted/60 focus-visible:outline-none sm:text-4xl"
            />
            <button type="button" onClick={close} aria-label="Close search" className="p-1 text-ink transition-transform hover:rotate-90">
              <CloseIcon className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
          </form>

          {!q.trim() ? (
            <div className="mt-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Browse ranges</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.id}
                    href={`/shop?category=${c.id}`}
                    onClick={close}
                    className="border border-line bg-white px-4 py-2.5 text-[14px] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream-light"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="mt-10 text-center font-serif text-2xl text-ink">No prints match “{q}”.</p>
          ) : (
            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </p>
                <button onClick={submit} className="link-underline inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.16em] text-ink">
                  View all <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                {results.slice(0, 12).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/shop/${p.slug}`} onClick={close} className="group block">
                      <div className="aspect-[3/4] overflow-hidden bg-cream">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={thumb(p.images[0])} alt={p.name} className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <p className="mt-2 font-serif text-lg leading-tight text-ink group-hover:text-primary">
                        <Highlight text={p.name} query={q} />
                      </p>
                      <p className="line-clamp-1 text-[13px] text-muted">
                        <Highlight text={`${p.colour} · ${p.motif}`} query={q} />
                      </p>
                      <p className="text-[13px] font-medium text-ink">{cardPriceText(p)}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
