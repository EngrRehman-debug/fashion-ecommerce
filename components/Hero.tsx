"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import hero from "@/data/hero.json";
import { IMAGES } from "@/lib/images";
import { PRODUCTS } from "@/lib/catalog";
import { ArrowRight, Sparkle } from "./icons";

/**
 * Entrance animations here are CSS (animate-rise / animate-unveil) rather than
 * motion's `initial`, so the hero is visible from the server HTML without
 * waiting for JavaScript. Motion only drives the scroll parallax.
 */
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream-light">
      {/* Faint oversized word behind everything */}
      <p
        aria-hidden
        className="pointer-events-none absolute -right-[4vw] top-[8%] select-none font-serif text-[30vw] italic leading-none text-ink/[0.035] lg:text-[22vw]"
      >
        Batik
      </p>

      {/* Desktop: exactly one screen tall under the announcement bar (44px) + navbar (95px). */}
      <div className="container-lux relative grid grid-cols-1 items-center gap-12 pb-16 pt-10 lg:h-[calc(100svh-139px)] lg:min-h-[600px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10 lg:py-8">
        {/* Copy */}
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow animate-rise" style={delay(0.1)}>
            {hero.eyebrow}
          </p>

          {/* Two lines on desktop; the size scales with the viewport so each line fits. */}
          <h1 className="h-display mt-6 text-[3.2rem] leading-[0.95] sm:text-display-lg lg:text-[clamp(3.5rem,5.1vw,6.4rem)] lg:leading-[0.92]">
            <span className="block animate-rise lg:whitespace-nowrap" style={delay(0.2)}>
              {hero.titleLine1} <em className="text-primary">{hero.titleLine2}</em>
            </span>
            <span className="block animate-rise lg:whitespace-nowrap" style={delay(0.34)}>
              {hero.titleLine3}
            </span>
          </h1>

          <p className="mt-7 max-w-lg animate-rise text-[17px] leading-relaxed text-ink-soft" style={delay(0.48)}>
            {hero.body}
          </p>

          <div className="mt-9 flex animate-rise flex-wrap items-center gap-4" style={delay(0.6)}>
            <Link href="/shop" className="btn-primary">
              <span>Shop the collection</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/about" className="btn-outline">
              <span>Our craft</span>
            </Link>
          </div>

          {/* Dropped on short laptop screens so the hero still fits in one view. */}
          <dl className="mt-12 grid max-w-lg animate-rise grid-cols-3 gap-6 border-t border-line pt-7 lg:[@media(max-height:760px)]:hidden" style={delay(0.72)}>
            {[...hero.stats.slice(0, 2), { value: `${PRODUCTS.length}+`, label: "Unique designs" }].map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-[12px] uppercase tracking-[0.16em] text-muted sm:text-[13px]">{s.label}</dt>
                <dd className="font-serif text-3xl text-ink sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Image collage */}
        {/* The collage takes the full hero height on desktop; width follows from its ratio. */}
        <div className="relative mx-auto aspect-[0.98] w-full max-w-[640px] lg:ml-auto lg:mr-0 lg:h-[min(calc(100svh-190px),780px)] lg:w-auto lg:max-w-none lg:self-start">
          <motion.div style={{ y: yBig }} className="absolute right-0 top-0 aspect-[4/5] h-[90%]">
            <div className="h-full animate-unveil overflow-hidden bg-cream shadow-card" style={delay(0.15)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES.hero}
                alt="Model wearing a CWSK Enterprises handcrafted batik shirt"
                fetchPriority="high"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </motion.div>

          <motion.div style={{ y: ySmall }} className="absolute bottom-0 left-0 w-[40%]">
            <div className="aspect-[3/4] animate-slide-in-left overflow-hidden border-[6px] border-cream-light bg-cream shadow-card" style={delay(0.55)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMAGES.heroDetail} alt="Short-sleeve batik shirt from the studio shoot" className="h-full w-full object-cover object-top" />
            </div>
          </motion.div>

          {/* Rotating badge */}
          <div className="absolute left-[4%] top-[8%] hidden h-28 w-28 animate-rise sm:block" style={delay(0.9)}>
            <svg viewBox="0 0 100 100" className="h-full w-full animate-[spin_22s_linear_infinite]">
              <defs>
                <path id="badge-circle" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
              </defs>
              <circle cx="50" cy="50" r="49" className="fill-cream-light" />
              <text className="fill-ink text-[9px] uppercase">
                <textPath href="#badge-circle" textLength="232" lengthAdjust="spacing">
                  One print · One shirt · Made by hand ·
                </textPath>
              </text>
            </svg>
            <Sparkle className="absolute inset-0 m-auto h-7 w-7 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}
