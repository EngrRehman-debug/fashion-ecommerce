"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Category, Product } from "@/lib/catalog";
import { MAX_QTY, useCart } from "@/lib/cart";
import { useT } from "@/lib/i18n/client";
import OptionPicker, { QtyStepper } from "./OptionPicker";
import { startNavigationLoader } from "./NavigationLoader";
import { BagIcon, CheckIcon, QrIcon, ReturnIcon, TruckIcon } from "./icons";

/** Option/size/quantity picker with Add to Cart and Buy Now, for the product page. */
export default function PurchasePanel({ product, category: base }: { product: Product; category: Category }) {
  const t = useT();
  const p = t.m.product;
  const category = t.category(base);
  const router = useRouter();
  const { add, openDrawer } = useCart();
  const [option, setOption] = useState(category.options[0]);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [tried, setTried] = useState(false);
  const [added, setAdded] = useState(false);
  const missingSize = option.needsSize && !size;

  const addToCart = () => {
    setTried(true);
    if (missingSize) return false;
    add({ slug: product.slug, optionId: option.id, size: option.needsSize ? size : null }, qty);
    return true;
  };

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <p className="font-serif text-4xl text-ink">{t.money(option.price)}</p>
        {category.options.length > 1 && <p className="text-[14px] text-muted">{option.label}</p>}
      </div>
      {option.price === null && (
        <p className="mt-2 text-[14px] text-muted">{p.priceOnRequestNote}</p>
      )}

      <div className="mt-8 border-t border-line pt-8">
        <OptionPicker
          category={category}
          option={option}
          onOption={setOption}
          size={size}
          onSize={setSize}
          sizeError={tried && missingSize}
        />
      </div>

      <div className="mt-7">
        <p className="field-label">{p.quantity}</p>
        <QtyStepper value={qty} max={MAX_QTY} onChange={(n) => setQty(Math.max(1, n))} />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => {
            if (!addToCart()) return;
            setAdded(true);
            window.setTimeout(() => setAdded(false), 2200);
            openDrawer();
          }}
          className="btn-primary w-full"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? "added" : "add"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2"
            >
              {added ? <CheckIcon className="h-4 w-4" /> : <BagIcon className="h-4 w-4" />}
              {added ? t.m.common.added : t.m.common.addToCart}
            </motion.span>
          </AnimatePresence>
        </button>
        <button
          onClick={() => {
            if (!addToCart()) return;
            startNavigationLoader();
            router.push("/checkout");
          }}
          className="btn-outline w-full"
        >
          <span>{p.buyNow}</span>
        </button>
      </div>

      <ul className="mt-8 space-y-3 border-t border-line pt-7 text-[15px] text-ink-soft">
        <li className="flex items-start gap-3">
          <QrIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          {p.perkQr}
        </li>
        <li className="flex items-start gap-3">
          <TruckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span>
            {p.perkDelivery}{" "}
            <Link href="/shipping-returns" className="link-underline text-ink">{p.shippingInfo}</Link>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <ReturnIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          {p.perkReturns}
        </li>
      </ul>
    </div>
  );
}
