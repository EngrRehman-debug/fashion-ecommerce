import Link from "next/link";
import { CATEGORIES, designs, productsIn } from "@/lib/catalog";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import Slider from "./Slider";
import { ArrowRight } from "./icons";

/** A mix across ranges: the first few of each, taken in turn. */
function mix(count: number) {
  const queues = CATEGORIES.map((c) => productsIn(c.id).slice(0, 4));
  const out = [];
  while (out.length < count && queues.some((q) => q.length)) {
    for (const q of queues) if (q.length && out.length < count) out.push(q.shift()!);
  }
  return out;
}

/** "From the collection" band: range links plus a draggable product slider. */
export default function CollectionStrip({
  eyebrow = "From the collection",
  title,
}: {
  eyebrow?: string;
  title: React.ReactNode;
}) {
  const products = mix(14);
  return (
    <section className="overflow-hidden bg-white py-20 lg:py-28">
      <div className="container-lux">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          action={
            <Link href="/shop" className="btn-primary">
              <span>Shop all</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <div className="no-scrollbar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/shop?category=${c.id}`}
              className="group flex shrink-0 items-baseline gap-2 border border-line bg-cream-light px-4 py-2.5 text-[14px] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream-light"
            >
              {c.name}
              <span className="text-[12px] text-muted transition-colors group-hover:text-cream-light/60">
                {designs(productsIn(c.id).length)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <Slider
        label="Pieces from the collection"
        className="mt-10"
        trackClassName="gap-3 scroll-px-4 px-4 sm:gap-5 sm:scroll-px-6 sm:px-6 lg:scroll-px-10 lg:px-10 2xl:scroll-px-14 2xl:px-14"
      >
        {products.map((p) => (
          <div key={p.slug} className="w-[46vw] shrink-0 snap-start sm:w-[260px] lg:w-[280px]">
            <ProductCard product={p} />
          </div>
        ))}
      </Slider>
    </section>
  );
}
