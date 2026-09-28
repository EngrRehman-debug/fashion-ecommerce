import { QuoteMark } from "./icons";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import data from "@/data/testimonials.json";

const { testimonials } = data;
type T = (typeof testimonials)[number];

/** Soft fade at both ends so cards drift in and out rather than being cut. */
const EDGE_FADE = "[mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]";

/**
 * Endless, hover-to-pause marquee of reviews: one row on phones, two rows
 * moving in opposite directions on larger screens.
 */
export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-cream-light py-20 lg:py-28">
      <div className="container-lux">
        <SectionHeading
          center
          eyebrow="In their words"
          title={
            <>
              Worn with <em className="text-primary">confidence</em>
            </>
          }
        />
      </div>

      <Reveal className={`mt-14 space-y-5 lg:space-y-6 ${EDGE_FADE}`}>
        <Row items={testimonials} />
        <Row items={[...testimonials].reverse()} reverse className="hidden md:flex" />
      </Reveal>
    </section>
  );
}

function Row({ items, reverse = false, className = "flex" }: { items: T[]; reverse?: boolean; className?: string }) {
  // Enough copies to overfill wide screens; the track scrolls by exactly half.
  const half = Array.from({ length: 4 }, () => items).flat();
  return (
    <div className={`group ${className}`}>
      <div
        className={`flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused] lg:gap-6 ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
        style={{ animationDuration: `${half.length * 7}s` }}
      >
        {[...half, ...half].map((item, i) => (
          <Card key={i} item={item} hidden={i >= half.length} />
        ))}
      </div>
    </div>
  );
}

function Card({ item, hidden }: { item: T; hidden: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      className="flex w-[300px] shrink-0 flex-col border border-line bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-ink/25 hover:shadow-card sm:w-[420px] lg:p-9"
    >
      <QuoteMark className="h-6 w-6 text-gold" />
      <blockquote className="mt-5 flex-1 font-serif text-[20px] leading-snug text-ink sm:text-[22px]">“{item.text}”</blockquote>
      <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-serif text-lg text-cream-light">
          {item.name.charAt(0)}
        </span>
        <span>
          <span className="block text-[15px] font-medium text-ink">{item.name}</span>
          <span className="block text-[13px] uppercase tracking-[0.16em] text-muted">{item.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
