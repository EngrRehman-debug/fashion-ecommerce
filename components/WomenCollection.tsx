import Link from "next/link";
import { categoriesFor, designs, productsFor } from "@/lib/catalog";
import { PRODUCT_GRID } from "@/lib/ui";
import ProductCard from "./ProductCard";
import SectionHeading from "./SectionHeading";
import { ArrowRight } from "./icons";

const RANGES = categoriesFor("women");
// Newest designs are appended to data/products.json, so show the latest first.
const LATEST = productsFor("women").reverse().slice(0, 12);

/** The women's side of the collection, kept apart from the men's ranges above. */
export default function WomenCollection() {
  if (!LATEST.length) return null;
  const total = productsFor("women").length;

  return (
    <section id="women" className="bg-cream py-20 lg:py-28">
      <div className="container-lux">
        <SectionHeading
          eyebrow="For women"
          title={
            <>
              The <em className="text-primary">women&apos;s</em> collection
            </>
          }
          intro={RANGES.length === 1 ? RANGES[0].tagline : "Hand-finished pieces for women, from fabric lengths to ready-to-wear."}
          action={
            <Link href="/shop?for=women" className="btn-outline">
              <span>Shop women · {designs(total)}</span>
            </Link>
          }
        />

        <div className={`mt-10 lg:mt-14 ${PRODUCT_GRID}`}>
          {LATEST.map((p, i) => (
            // Show 10 on five-column screens so the last row is full.
            <div key={p.slug} className={i >= 10 ? "xl:hidden 2xl:block" : ""}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/shop?for=women" className="btn-primary">
            <span>Explore the women&apos;s collection</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
