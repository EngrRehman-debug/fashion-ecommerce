"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { thumb } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useT } from "@/lib/i18n/client";
import { buildWhatsAppOrderUrl, type Customer } from "@/lib/site";
import { ArrowRight, BagIcon, CheckIcon, QrIcon, WhatsAppIcon } from "./icons";

const CUSTOMER_KEY = "cwsk-customer-v1";
const LAST_ORDER_KEY = "cwsk-last-order-v1";

const STATES = [
  "Johor", "Kedah", "Kelantan", "Melaka", "Negeri Sembilan", "Pahang", "Perak", "Perlis",
  "Pulau Pinang", "Sabah", "Sarawak", "Selangor", "Terengganu", "Kuala Lumpur", "Labuan", "Putrajaya",
];

const EMPTY: Customer = {
  name: "", phone: "", address: "", city: "", postcode: "", state: "", country: "", notes: "",
};

type LastOrder = { orderId: string; url: string; total: string; items: number; at: string };

/** Loose check — at least 9 digits, allowing +, spaces and dashes. */
const isPhone = (v: string) => /^\+?[\d\s-]{9,}$/.test(v.trim());

function makeOrderId() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `CW${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export default function CheckoutForm() {
  const { ready, lines, count, subtotal, hasUnpriced, clear } = useCart();
  const t = useT();
  const k = t.m.checkout;
  const [c, setC] = useState<Customer>({ ...EMPTY, country: k.defaultCountry });
  const [tried, setTried] = useState(false);
  const [done, setDone] = useState<LastOrder | null>(null);

  // Prefill from the last checkout on this device.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CUSTOMER_KEY);
      if (saved) setC((prev) => ({ ...prev, ...JSON.parse(saved), notes: "" }));
    } catch {}
  }, []);

  const set = (field: keyof Customer) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setC((prev) => ({ ...prev, [field]: e.target.value }));

  const errors: Partial<Record<keyof Customer, string>> = {
    name: c.name.trim() ? "" : k.errors.name,
    phone: isPhone(c.phone) ? "" : k.errors.phone,
    address: c.address.trim() ? "" : k.errors.address,
    city: c.city.trim() ? "" : k.errors.city,
    postcode: c.postcode.trim() ? "" : k.errors.postcode,
    state: c.state.trim() ? "" : k.errors.state,
    country: c.country.trim() ? "" : k.errors.country,
  };
  const valid = Object.values(errors).every((e) => !e);
  const err = (f: keyof Customer) => (tried ? errors[f] : "");

  const total = hasUnpriced ? k.totalWithUnpriced(t.money(subtotal)) : t.money(subtotal);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTried(true);
    if (!valid || !lines.length) {
      // After the re-render that marks the invalid fields.
      window.setTimeout(() => document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(), 0);
      return;
    }
    const orderId = makeOrderId();
    const url = buildWhatsAppOrderUrl({
      orderId,
      total,
      customer: c,
      copy: t.m.whatsapp,
      lines: lines.map((l) => ({
        name: l.product.name,
        option: t.option(l.category.id, l.option).label,
        size: l.size,
        qty: l.qty,
        price: t.money(l.option.price),
        url: `${window.location.origin}/shop/${l.slug}`,
      })),
    });
    const order: LastOrder = { orderId, url, total, items: count, at: new Date().toISOString() };
    try {
      window.localStorage.setItem(CUSTOMER_KEY, JSON.stringify({ ...c, notes: "" }));
      window.localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
    } catch {}
    window.open(url, "_blank", "noopener,noreferrer");
    clear();
    setDone(order);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!ready) return <div className="min-h-[50vh]" />;

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl border border-line bg-white p-8 text-center sm:p-14"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink text-cream-light">
          <CheckIcon className="h-8 w-8" />
        </span>
        <p className="eyebrow mt-8 justify-center">{k.order(done.orderId)}</p>
        <h2 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">{k.almostThere}</h2>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-ink-soft">
          {k.openedBefore}
          <strong>{k.openedSend}</strong>
          {k.openedAfter}
        </p>
        <a href={done.url} target="_blank" rel="noopener noreferrer" className="btn-primary mt-9">
          <WhatsAppIcon className="h-5 w-5" />
          <span>{k.openAgain}</span>
        </a>
        <div className="mt-6">
          <Link href="/shop" className="link-underline text-[13px] font-medium uppercase tracking-[0.16em] text-ink">
            {t.m.cart.continueShopping}
          </Link>
        </div>
      </motion.div>
    );
  }

  if (!lines.length) {
    return (
      <div className="flex flex-col items-center py-20 text-center">
        <BagIcon className="h-16 w-16 text-sand" />
        <h2 className="mt-6 font-serif text-4xl text-ink">{k.nothing}</h2>
        <p className="mt-3 text-[16px] text-muted">{k.nothingNote}</p>
        <Link href="/shop" className="btn-primary mt-10">
          <span>{t.m.common.shopCollection}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
      <div className="space-y-12">
        <Steps />

        <fieldset>
          <legend className="font-serif text-3xl text-ink">{k.contact}</legend>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label={k.fullName} error={err("name")}>
              <input className="field" autoComplete="name" value={c.name} onChange={set("name")} aria-invalid={!!err("name")} />
            </Field>
            <Field label={k.phone} error={err("phone")}>
              <input className="field" type="tel" autoComplete="tel" placeholder={k.phonePlaceholder} value={c.phone} onChange={set("phone")} aria-invalid={!!err("phone")} />
            </Field>
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-serif text-3xl text-ink">{k.deliveryAddress}</legend>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label={k.street} error={err("address")} wide>
              <input className="field" autoComplete="street-address" placeholder={k.streetPlaceholder} value={c.address} onChange={set("address")} aria-invalid={!!err("address")} />
            </Field>
            <Field label={k.city} error={err("city")}>
              <input className="field" autoComplete="address-level2" value={c.city} onChange={set("city")} aria-invalid={!!err("city")} />
            </Field>
            <Field label={k.postcode} error={err("postcode")}>
              <input className="field" autoComplete="postal-code" inputMode="numeric" value={c.postcode} onChange={set("postcode")} aria-invalid={!!err("postcode")} />
            </Field>
            <Field label={k.state} error={err("state")}>
              <input className="field" list="my-states" autoComplete="address-level1" value={c.state} onChange={set("state")} aria-invalid={!!err("state")} />
              <datalist id="my-states">
                {STATES.map((s) => (
                  <option key={s} value={s} />
                ))}
              </datalist>
            </Field>
            <Field label={k.country} error={err("country")}>
              <input className="field" autoComplete="country-name" value={c.country} onChange={set("country")} aria-invalid={!!err("country")} />
            </Field>
            <Field label={k.notes} wide>
              <textarea className="field resize-none" rows={3} placeholder={k.notesPlaceholder} value={c.notes} onChange={set("notes")} />
            </Field>
          </div>
        </fieldset>

        <p className="text-[13px] leading-relaxed text-muted">
          {k.consentBefore}
          <Link href="/policies" className="link-underline text-ink">{k.consentPolicies}</Link>
          {k.consentAfter}
        </p>
      </div>

      {/* Summary */}
      <aside className="h-fit border border-line bg-white p-7 lg:sticky lg:top-28 lg:p-9">
        <h2 className="font-serif text-3xl text-ink">{k.yourOrder}</h2>
        <ul className="mt-6 max-h-[340px] divide-y divide-line overflow-y-auto border-y border-line">
          {lines.map((l) => (
            <li key={l.key} className="flex gap-4 py-4">
              <div className="relative w-16 shrink-0 bg-cream">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumb(l.product.images[0])} alt={l.product.name} className="aspect-[3/4] w-full object-cover object-top" />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink text-[12px] font-medium text-cream-light">
                  {l.qty}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-serif text-lg leading-tight text-ink">{l.product.name}</p>
                <p className="text-[13px] text-muted">
                  {t.option(l.category.id, l.option).label}
                  {l.size && ` · ${l.size}`}
                </p>
              </div>
              <p className="shrink-0 text-[14px] font-medium">{t.money(l.total)}</p>
            </li>
          ))}
        </ul>
        <dl className="space-y-3 py-6 text-[15px]">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{t.m.cart.subtotal}</dt>
            <dd>{t.money(subtotal)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{t.m.cart.shipping}</dt>
            <dd className="text-right">{t.m.cart.confirmedOnWhatsApp}</dd>
          </div>
        </dl>
        <div className="flex items-baseline justify-between border-t border-line pt-6">
          <span className="text-[13px] font-medium uppercase tracking-[0.18em]">{t.m.cart.total}</span>
          <span className="font-serif text-4xl">{t.money(subtotal)}</span>
        </div>
        <AnimatePresence>
          {hasUnpriced && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-[13px] text-muted">
              {k.unpricedPlus}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Kept on one line on phones: tighter padding and letter-spacing below sm. */}
        <button
          type="submit"
          className="btn mt-8 w-full gap-1.5 whitespace-nowrap bg-[#1FAF5A] px-3 text-[12px] tracking-[0.1em] text-white before:bg-ink max-[359px]:text-[11px] max-[359px]:tracking-[0.05em] sm:gap-2 sm:px-8 sm:text-[13px] sm:tracking-[0.18em]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          <span>{k.placeOrder}</span>
        </button>
        {tried && !valid && (
          <p role="alert" className="mt-3 text-center text-[13px] text-red-700">
            {k.completeFields}
          </p>
        )}
        <p className="mt-5 flex gap-3 text-[13px] leading-relaxed text-muted">
          <QrIcon className="h-5 w-5 shrink-0 text-primary" />
          {k.noPayment}
        </p>
      </aside>
    </form>
  );
}

function Field({
  label,
  error,
  wide = false,
  children,
}: {
  label: string;
  error?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""} ${error ? "[&_.field]:border-red-600" : ""}`}>
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-[13px] text-red-700">{error}</span>}
    </label>
  );
}

function Steps() {
  const steps = useT().m.checkout.steps.map((s, i) => ({ ...s, n: String(i + 1) }));
  return (
    <ol className="grid gap-3 sm:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.n} className={`flex gap-3 border p-4 ${i === 0 ? "border-ink bg-white" : "border-line"}`}>
          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-serif text-lg ${i === 0 ? "bg-ink text-cream-light" : "bg-cream text-ink"}`}>
            {s.n}
          </span>
          <span>
            <span className="block text-[14px] font-medium text-ink">{s.title}</span>
            <span className="block text-[13px] text-muted">{s.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
