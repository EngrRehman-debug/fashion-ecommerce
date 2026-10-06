"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { thumb } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useT } from "@/lib/i18n/client";
import { QtyStepper } from "./OptionPicker";
import { ArrowRight, BagIcon, QrIcon, TrashIcon, WhatsAppIcon } from "./icons";

/** Full cart page: editable lines + order summary. */
export default function CartView() {
  const { ready, lines, count, subtotal, hasUnpriced, setQty, remove, clear } = useCart();
  const t = useT();
  const c = t.m.cart;

  if (!ready) return <div className="min-h-[40vh]" />;

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 text-center">
        <BagIcon className="h-16 w-16 text-sand" />
        <h2 className="mt-6 font-serif text-4xl text-ink">{c.empty}</h2>
        <p className="mt-3 max-w-md text-[16px] text-muted">{c.emptyPageNote}</p>
        <Link href="/shop" className="btn-primary mt-10">
          <span>{t.m.common.shopCollection}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
      <div>
        <div className="hidden grid-cols-[1fr_140px_120px_40px] gap-6 border-b border-ink pb-4 text-[12px] font-medium uppercase tracking-[0.18em] text-muted md:grid">
          <span>{c.product}</span>
          <span>{c.quantity}</span>
          <span className="text-right">{c.total}</span>
          <span />
        </div>
        <ul>
          <AnimatePresence initial={false}>
            {lines.map((l) => (
              <motion.li
                key={l.key}
                layout
                exit={{ opacity: 0, x: -30, transition: { duration: 0.3 } }}
                className="grid grid-cols-[88px_1fr] gap-4 border-b border-line py-6 md:grid-cols-[1fr_140px_120px_40px] md:items-center md:gap-6"
              >
                <div className="contents md:flex md:items-center md:gap-5">
                  <Link href={`/shop/${l.slug}`} className="block w-[88px] shrink-0 overflow-hidden bg-cream md:w-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thumb(l.product.images[0])} alt={l.product.name} className="aspect-[3/4] w-full object-cover object-top" />
                  </Link>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted">{t.category(l.category).name}</p>
                    <Link href={`/shop/${l.slug}`} className="mt-1 block font-serif text-2xl leading-tight text-ink hover:text-primary">
                      {l.product.name}
                    </Link>
                    <p className="mt-1 text-[14px] text-muted">
                      {t.option(l.category.id, l.option).label}
                      {l.size && ` · ${t.m.product.sizeValue(l.size)}`} · {t.money(l.option.price)}
                    </p>
                    <div className="mt-4 flex items-center justify-between md:hidden">
                      <QtyStepper small value={l.qty} onChange={(n) => setQty(l.key, n)} />
                      <span className="text-[15px] font-medium">{t.money(l.total)}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <QtyStepper small value={l.qty} onChange={(n) => setQty(l.key, n)} />
                </div>
                <p className="hidden text-right text-[16px] font-medium text-ink md:block">{t.money(l.total)}</p>
                <button
                  onClick={() => remove(l.key)}
                  aria-label={c.remove(l.product.name)}
                  className="col-start-2 justify-self-start text-[13px] text-muted underline-offset-4 hover:text-red-700 hover:underline md:col-start-auto md:justify-self-end md:no-underline"
                >
                  <span className="md:hidden">{c.removeShort}</span>
                  <TrashIcon className="hidden h-5 w-5 md:block" />
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <Link href="/shop" className="link-underline text-[13px] font-medium uppercase tracking-[0.16em] text-ink">
            ← {c.continueShopping}
          </Link>
          <button onClick={clear} className="text-[13px] font-medium uppercase tracking-[0.16em] text-muted hover:text-red-700">
            {c.clearCart}
          </button>
        </div>
      </div>

      <aside className="h-fit border border-line bg-white p-7 lg:sticky lg:top-28 lg:p-9">
        <h2 className="font-serif text-3xl text-ink">{c.orderSummary}</h2>
        <dl className="mt-6 space-y-3 border-b border-line pb-6 text-[15px]">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{c.items}</dt>
            <dd>{count}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{c.subtotal}</dt>
            <dd>{t.money(subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{c.shipping}</dt>
            <dd className="text-right">{c.confirmedOnWhatsApp}</dd>
          </div>
        </dl>
        <div className="flex items-baseline justify-between pt-6">
          <span className="text-[13px] font-medium uppercase tracking-[0.18em]">{c.total}</span>
          <span className="font-serif text-4xl">
            {t.money(subtotal)}
            {hasUnpriced && <span className="align-super text-lg text-primary">*</span>}
          </span>
        </div>
        {hasUnpriced && (
          <p className="mt-2 text-[13px] leading-relaxed text-muted">
            {c.unpricedFinal}
          </p>
        )}
        <Link href="/checkout" className="btn-primary mt-8 w-full">
          <span>{c.proceed}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <ul className="mt-7 space-y-3 text-[14px] text-ink-soft">
          <li className="flex gap-3">
            <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
            {c.sentOnWhatsApp}
          </li>
          <li className="flex gap-3">
            <QrIcon className="h-5 w-5 shrink-0 text-primary" />
            {c.qrNote}
          </li>
        </ul>
      </aside>
    </div>
  );
}
