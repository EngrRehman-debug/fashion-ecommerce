import Link from "next/link";
import { PRODUCTS, cardPriceText, getCategory, thumb } from "@/lib/catalog";
import SectionHeading from "./SectionHeading";
import Slider from "./Slider";
import CardImage from "./CardImage";
import { ArrowRight } from "./icons";

/** Products with a full photoshoot (several photos) — the studio lookbook. */
const LOOKS = PRODUCTS.filter((p) => p.images.length >= 5).slice(0, 12);

/** Swipe/drag slider of posed studio shots, each linking to its product. */
export default function Lookbook() {
  if (!LOOKS.length) return null;
  return (
    <section className="overflow-hidden bg-cream py-20 lg:py-28">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Lookbook · Studio 2026"
          title={
            <>
              Shot in the <em className="text-primary">studio</em>
            </>
          }
          intro="Our newest pieces, photographed on the model. Swipe or drag through and shop the look."
        />
      </div>

      <Slider
        label="Studio lookbook"
        className="mt-12"
        trackClassName="gap-4 scroll-px-4 px-4 sm:gap-6 sm:scroll-px-6 sm:px-6 lg:scroll-px-10 lg:px-10 2xl:scroll-px-14 2xl:px-14"
      >
        {LOOKS.map((p) => (
          <Link
            key={p.slug}
            href={`/shop/${p.slug}`}
            draggable={false}
            className="group relative block w-[72vw] shrink-0 snap-start sm:w-[340px] lg:w-[380px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
              <CardImage
                src={thumb(p.images.at(-1)!)}
                alt={`${p.name} — studio lookbook`}
                className="h-full w-full select-none object-cover object-top transition-all duration-[1400ms] ease-lux group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 bg-cream-light/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-ink backdrop-blur-sm">
                {p.images.length} looks
              </span>
              <span className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-cream-light text-ink transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-ink group-hover:text-cream-light">
                <ArrowRight className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted sm:text-xs">
                  {getCategory(p.category)?.name}
                </p>
                <p className="mt-1 truncate font-serif text-2xl text-ink transition-colors group-hover:text-primary">{p.name}</p>
              </div>
              <p className="shrink-0 text-[15px] font-medium text-ink">{cardPriceText(p)}</p>
            </div>
          </Link>
        ))}
      </Slider>
    </section>
  );
}
