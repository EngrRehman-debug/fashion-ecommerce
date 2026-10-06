"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { IMAGES } from "@/lib/images";
import { PRODUCTS, categorySlides } from "@/lib/catalog";
import { useT } from "@/lib/i18n/client";
import RotatingShot, { type Slide } from "./RotatingShot";
import { ArrowRight } from "./icons";

/**
 * Entrance animations here are CSS (animate-rise / animate-unveil) rather than
 * motion's `initial`, so the hero is visible from the server HTML without
 * waiting for JavaScript. Motion only drives the scroll parallax.
 */
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

const PAWANG = categorySlides("batik-pawang", 4, false);
const TOP = categorySlides("sarong", 5);
const SMALL = categorySlides("short-sleeve", 5);

export default function Hero() {
  const t = useT();
  const { hero } = t.content;
  const tag = t.m.common.shopName("{name}");
  const BIG: Slide[] = [
    { src: IMAGES.hero, alt: t.m.home.hero.imageAlt, href: IMAGES.heroHref, name: "Batik Pawang" },
    ...PAWANG,
  ];
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

          {/* One row on every screen: tighter padding and tracking on phones. */}
          <div className="mt-9 flex animate-rise items-center gap-2.5 sm:gap-4" style={delay(0.6)}>
            <Link href="/shop" className="btn-primary whitespace-nowrap px-4 text-[12px] tracking-[0.12em] sm:px-8 sm:text-[13px] sm:tracking-[0.18em]">
              <span>{t.m.common.shopCollection}</span>
              <ArrowRight className="hidden h-4 w-4 sm:block" />
            </Link>
            <Link href="/about" className="btn-outline whitespace-nowrap px-4 text-[12px] tracking-[0.12em] sm:px-8 sm:text-[13px] sm:tracking-[0.18em]">
              <span>{t.m.home.hero.ourCraft}</span>
            </Link>
          </div>

          {/* Dropped on short laptop screens so the hero still fits in one view. */}
          <dl className="mt-12 grid max-w-lg animate-rise grid-cols-3 gap-6 border-t border-line pt-7 lg:[@media(max-height:760px)]:hidden" style={delay(0.72)}>
            {[...hero.stats.slice(0, 2), { value: `${PRODUCTS.length}+`, label: t.m.home.hero.uniqueDesigns }].map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-[12px] uppercase tracking-[0.16em] text-muted sm:text-[13px]">{s.label}</dt>
                <dd className="font-serif text-3xl text-ink sm:text-4xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Image collage: three shots, each cycling through its own range.
            Every shot changes every 3s, staggered by 1s — so one photo changes each second. */}
        <div className="relative mx-auto aspect-[0.98] w-full max-w-[640px] lg:ml-auto lg:mr-0 lg:h-[min(calc(100svh-190px),780px)] lg:w-auto lg:max-w-none lg:self-start">
          <motion.div style={{ y: yBig }} className="absolute right-0 top-0 aspect-[4/5] h-[90%]">
            <div className="h-full animate-unveil shadow-card" style={delay(0.15)}>
              <RotatingShot slides={BIG} offset={3000} priority tag={tag} />
            </div>
          </motion.div>

          <motion.div style={{ y: ySmall }} className="absolute left-[4%] top-[2%] w-[29%]">
            <div className="aspect-[3/4] animate-slide-in-left border-[6px] border-cream-light shadow-card" style={delay(0.45)}>
              <RotatingShot slides={TOP} offset={1000} tag={tag} tagClassName="bottom-2 right-2 h-9 w-9" />
            </div>
          </motion.div>

          <motion.div style={{ y: ySmall }} className="absolute bottom-0 left-0 w-[40%]">
            <div className="aspect-[3/4] animate-slide-in-left border-[6px] border-cream-light shadow-card" style={delay(0.6)}>
              <RotatingShot slides={SMALL} offset={2000} tag={tag} tagClassName="bottom-2 right-2 h-9 w-9" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
