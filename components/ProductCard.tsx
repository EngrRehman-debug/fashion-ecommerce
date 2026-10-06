"use client";

import Link from "next/link";
import { getCategory, thumb, type Product } from "@/lib/catalog";
import { needsChoice, useCart } from "@/lib/cart";
import { useT } from "@/lib/i18n/client";
import CardImage from "./CardImage";
import Highlight from "./Highlight";
import { BagIcon, PlusIcon } from "./icons";

/** A single product tile — used by the shop grid, homepage and related products. */
export default function ProductCard({
  product,
  priority = false,
  highlight,
}: {
  product: Product;
  priority?: boolean;
  /** Search text to highlight in the name and description. */
  highlight?: string;
}) {
  const { add, openDrawer, openQuickAdd } = useCart();
  const t = useT();
  const category = getCategory(product.category);
  const href = `/shop/${product.slug}`;
  const motif = t.motif(product.motif);
  const alt = `${product.name} — ${motif}`;
  const second = product.images[1];

  const onAdd = () => {
    if (!category) return;
    if (needsChoice(category)) return openQuickAdd(product);
    add({ slug: product.slug, optionId: category.options[0].id, size: null });
    openDrawer();
  };

  return (
    <article className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <Link href={href} aria-label={product.name} className="absolute inset-0 block">
          <CardImage
            src={thumb(product.images[0])}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className={`h-full w-full object-cover object-top transition-all duration-[1200ms] ease-lux group-hover:scale-[1.05] ${
              second ? "md:group-hover:opacity-0" : ""
            }`}
          />
          {second && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumb(second)}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 hidden h-full w-full scale-[1.05] object-cover object-top opacity-0 transition-all duration-[1200ms] ease-lux group-hover:scale-100 group-hover:opacity-100 md:block"
            />
          )}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        </Link>

        {product.images.length > 1 && (
          <span className="pointer-events-none absolute left-3 top-3 bg-cream-light/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
            {t.m.common.photos(product.images.length)}
          </span>
        )}

        {/* Desktop: full-width bar that slides up on hover */}
        <button
          onClick={onAdd}
          className="absolute inset-x-3 bottom-3 hidden translate-y-[calc(100%+1rem)] items-center justify-center gap-2 bg-cream-light/95 py-3.5 text-[13px] font-medium uppercase tracking-[0.16em] text-ink backdrop-blur transition-all duration-500 ease-lux hover:bg-ink hover:text-cream-light focus-visible:translate-y-0 group-hover:translate-y-0 md:flex"
        >
          <BagIcon className="h-4 w-4" />
          {t.m.common.addToCart}
        </button>

        {/* Mobile: always-visible round button */}
        <button
          onClick={onAdd}
          aria-label={t.m.product.addNamed(product.name)}
          className="absolute bottom-2.5 right-2.5 flex h-10 w-10 items-center justify-center rounded-full bg-cream-light/95 text-ink shadow-soft backdrop-blur transition-transform active:scale-90 md:hidden"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <Link href={href} className="mt-4 block">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted sm:text-xs">
          {category && t.category(category).name}
        </p>
        <h3 className="mt-1.5 font-serif text-[19px] leading-tight text-ink transition-colors group-hover:text-primary sm:text-[22px]">
          <Highlight text={product.name} query={highlight} />
        </h3>
        <p className="mt-1 line-clamp-1 text-[13px] text-muted sm:text-sm">
          <Highlight text={`${t.colour(product.colour)} · ${motif}`} query={highlight} />
        </p>
        <p className="mt-2 text-[14px] font-medium text-ink sm:text-[15px]">{t.cardPrice(product)}</p>
      </Link>
    </article>
  );
}
