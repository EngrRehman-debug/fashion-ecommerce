import Link from "next/link";
import { CATEGORIES, categoryCover, designs, productsIn, thumb, type Category } from "@/lib/catalog";
import SectionHeading from "./SectionHeading";
import { Stagger, StaggerItem } from "./Reveal";
import { ArrowRight } from "./icons";

/** Ranges ordered by how many designs they hold — the biggest gets the feature tile. */
const RANGES = [...CATEGORIES].sort((a, b) => productsIn(b.id).length - productsIn(a.id).length);

/**
 * One grid for heading + tiles.
 *
 * Mobile (6 cols):            Desktop (12 cols, rows: heading / top / bottom):
 *   [ feature  ][ 1 ]           [ heading   ][ 1  ][ 2  ]
 *   [          ][ 2 ]           [ feature   ][    ][    ]
 *   [  3  ][  4  ]              [           ][ 3 ][ 4 ][ 5 ]
 *   [     5      ]
 */
const PLACEMENT = [
  // feature
  "col-span-4 row-span-2 lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-2",
  // top-right pair — start level with the heading on desktop
  "col-span-2 aspect-[3/4] lg:col-span-3 lg:col-start-7 lg:row-span-2 lg:row-start-1",
  "col-span-2 aspect-[3/4] lg:col-span-3 lg:col-start-10 lg:row-span-2 lg:row-start-1",
  // bottom-right three
  "col-span-3 aspect-[4/5] lg:col-span-2 lg:col-start-7 lg:row-start-3",
  "col-span-3 aspect-[4/5] lg:col-span-2 lg:col-start-9 lg:row-start-3",
  "col-span-6 aspect-[16/7] lg:col-span-2 lg:col-start-11 lg:row-start-3",
];
const EXTRA = "col-span-3 aspect-[4/5] lg:col-span-4"; // any range beyond six

export default function CategoryTiles() {
  return (
    <section className="bg-cream-light py-20 lg:py-28">
      <div className="container-lux">
        <Stagger className="grid grid-cols-6 gap-3 sm:gap-4 lg:h-[min(96vh,940px)] lg:grid-cols-12 lg:grid-rows-[auto_minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="col-span-6 mb-6 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mb-4">
            <SectionHeading
              eyebrow="Shop by range"
              title={
                <>
                  {RANGES.length} ways to wear <em className="text-primary">batik</em>
                </>
              }
              intro="From our signature long-sleeve Batik Pawang to ready-made short-sleeves, full-length sarongs and matching sets."
            />
            <Link href="/shop" className="link-underline mt-6 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
              View everything <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {RANGES.map((c, i) => (
            <StaggerItem key={c.id} className={`${PLACEMENT[i] ?? EXTRA} lg:aspect-auto`}>
              <Tile category={c} feature={i === 0} compact={i >= 3} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function Tile({ category: c, feature, compact }: { category: Category; feature: boolean; compact: boolean }) {
  return (
    <Link href={`/shop?category=${c.id}`} className="group relative block h-full overflow-hidden bg-cream">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={feature ? categoryCover(c) : thumb(categoryCover(c))}
        alt={`${c.name} by CWSK Enterprises`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-[center_15%] transition-transform duration-[1400ms] ease-lux group-hover:scale-[1.06]"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent" />
      <div className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 ${compact ? "p-3 sm:p-5" : "p-3.5 sm:p-6 lg:p-7"}`}>
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream-light/75 sm:text-xs">
            {designs(productsIn(c.id).length)}
          </p>
          <h3
            className={`mt-1 font-serif leading-[0.95] text-cream-light ${
              feature ? "text-3xl sm:text-5xl lg:text-6xl" : compact ? "text-xl sm:text-2xl" : "text-lg sm:text-3xl"
            }`}
          >
            {c.name}
          </h3>
          {feature && (
            <p className="mt-3 hidden max-w-sm text-[15px] leading-relaxed text-cream-light/75 lg:block">{c.tagline}</p>
          )}
        </div>
        <span
          className={`hidden shrink-0 items-center justify-center rounded-full border border-cream-light/50 text-cream-light transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-cream-light group-hover:bg-cream-light group-hover:text-ink sm:flex ${
            compact ? "h-10 w-10" : "h-12 w-12 lg:h-14 lg:w-14"
          }`}
        >
          <ArrowRight className="h-5 w-5" />
        </span>
      </div>
    </Link>
  );
}
