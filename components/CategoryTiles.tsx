import Link from "next/link";
import { categoriesFor, categoryCover, productsIn, thumb, type Category } from "@/lib/catalog";
import { getT } from "@/lib/i18n/server";
import { rich } from "@/lib/i18n/rich";
import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "./Reveal";
import { ArrowRight } from "./icons";

/** Men's ranges (women's have their own section), biggest first — it gets the feature tile. */
const RANGES = categoriesFor("men").sort((a, b) => productsIn(b.id).length - productsIn(a.id).length);

type Size = "feature" | "tall" | "small" | "wide";

/**
 * Mobile (6 cols):            Desktop (12 cols, 2 rows, full-height feature):
 *   [ feature  ][ 1 ]           [ feature   ][ 1  ][ 2  ]
 *   [          ][ 2 ]           [           ][ 3 ][ 4 ][ 5 ]
 *   [  3  ][  4  ]
 *   [     5      ]   ← wide, with its tagline
 */
const PLACEMENT: { cls: string; size: Size }[] = [
  { cls: "col-span-4 row-span-2 lg:col-span-6 lg:row-span-2", size: "feature" },
  { cls: "col-span-2 aspect-[3/4] lg:col-span-3", size: "tall" },
  { cls: "col-span-2 aspect-[3/4] lg:col-span-3", size: "tall" },
  { cls: "col-span-3 aspect-[4/5] lg:col-span-2", size: "small" },
  { cls: "col-span-3 aspect-[4/5] lg:col-span-2", size: "small" },
  { cls: "col-span-6 aspect-[4/3] sm:aspect-[16/9] lg:col-span-2", size: "wide" },
];
const EXTRA = { cls: "col-span-3 aspect-[4/5] lg:col-span-4", size: "small" as Size };

export default function CategoryTiles() {
  const t = getT();
  const men = t.audience("men");
  return (
    <section className="bg-cream-light py-20 lg:py-28">
      <div className="container-lux">
        <SectionHeading
          eyebrow={men.eyebrow}
          title={rich(t.m.home.tiles.title(RANGES.length))}
          intro={t.m.home.tiles.intro}
          action={
            <Link href="/shop?for=men" className="btn-outline">
              <span>{men.shopAll}</span>
            </Link>
          }
        />

        <Stagger className="mt-10 grid grid-cols-6 gap-3 sm:gap-4 lg:mt-14 lg:h-[min(88vh,860px)] lg:grid-cols-12 lg:grid-rows-[minmax(0,1.15fr)_minmax(0,1fr)]">
          {RANGES.map((c, i) => {
            const p = PLACEMENT[i] ?? EXTRA;
            return (
              <StaggerItem key={c.id} className={`${p.cls} lg:aspect-auto`}>
                <Tile category={t.category(c)} size={p.size} />
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

function Tile({ category: c, size }: { category: Category; size: Size }) {
  const t = getT();
  const big = size === "feature";
  const showTagline = size === "feature" || size === "wide";
  return (
    <Link href={`/shop?category=${c.id}`} className="group relative block h-full overflow-hidden bg-cream">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={big ? categoryCover(c) : thumb(categoryCover(c))}
        alt={t.m.home.tiles.imageAlt(c.name)}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_12%] transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
      />
      {/* Strong bottom shade so the white text reads on any photo */}
      <span className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 via-35% to-transparent to-65%" />

      <div className={`absolute inset-x-0 bottom-0 text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] ${big ? "p-4 sm:p-7 lg:p-9" : "p-3 sm:p-5"}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white sm:text-xs">
          {t.designs(productsIn(c.id).length)}
        </p>
        <h3
          className={`mt-1 font-serif font-medium leading-[0.95] text-white ${
            big ? "text-3xl sm:text-5xl lg:text-7xl" : size === "wide" ? "text-3xl sm:text-3xl lg:text-2xl" : "text-lg sm:text-2xl lg:text-3xl"
          }`}
        >
          {c.name}
        </h3>
        {showTagline && (
          <p
            className={`mt-2 max-w-md text-[13px] leading-relaxed text-white/95 sm:text-[15px] ${
              size === "wide" ? "lg:hidden" : "hidden sm:block"
            }`}
          >
            {c.tagline}
          </p>
        )}

        {/* The anchor: a clear "shop" call on every tile */}
        <span
          className={`mt-3 inline-flex items-center gap-2 border-b border-white/70 pb-1 font-semibold uppercase tracking-[0.18em] text-white transition-all duration-500 group-hover:gap-3 group-hover:border-white ${
            big ? "text-[12px] sm:mt-5 sm:text-[13px]" : "text-[10px] sm:text-[11px]"
          }`}
        >
          {t.m.home.tiles.shop} {size === "tall" || size === "small" ? "" : c.name}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
