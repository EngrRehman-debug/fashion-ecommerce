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
  const half = Array.from({ length: Math.max(2, Math.ceil(12 / items.length)) }, () => items).flat();
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

/** "Amirul Hakim" → "AH". */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** Each review sits on its own colour (set as `bg` in data/testimonials.json). */
function Card({ item, hidden }: { item: T; hidden: boolean }) {
  return (
    <figure
      aria-hidden={hidden || undefined}
      style={{ backgroundColor: item.bg }}
      className="relative flex w-[300px] shrink-0 flex-col overflow-hidden p-7 text-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card sm:w-[420px] lg:p-9"
    >
      {/* Soft light in the corner, like cloth catching the sun */}
      <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
      <QuoteMark className="relative h-6 w-6 text-gold-light" />
      <blockquote className="relative mt-5 flex-1 font-serif text-[20px] leading-snug text-white sm:text-[22px]">“{item.text}”</blockquote>
      <figcaption className="relative mt-7 flex items-center gap-4 border-t border-white/20 pt-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 font-serif text-lg tracking-wide text-white backdrop-blur-sm">
          {initials(item.name)}
        </span>
        <span>
          <span className="block text-[15px] font-medium text-white">{item.name}</span>
          <span className="block text-[13px] uppercase tracking-[0.16em] text-white/70">{item.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}
