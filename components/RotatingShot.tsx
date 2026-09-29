"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import LookTag from "./LookTag";

export type Slide = { src: string; alt: string; href: string; name: string };

/**
 * Editorial photo that cross-fades through a category's products.
 * Several of these with staggered `offset`s make a collage that changes
 * one picture at a time. The corner anchor always links to the product shown.
 */
export default function RotatingShot({
  slides,
  every = 3000,
  offset = 0,
  tag,
  tagClassName,
  priority = false,
  className = "",
}: {
  slides: Slide[];
  /** How long each photo stays, in ms. */
  every?: number;
  /** Delay before the first change, to stagger several shots. */
  offset?: number;
  /** Anchor label; "{name}" is replaced with the product name. */
  tag?: string;
  tagClassName?: string;
  priority?: boolean;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
      interval = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), every);
    }, offset || every);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [reduce, slides.length, every, offset]);

  const current = slides[index];

  return (
    <div className={`relative h-full w-full overflow-hidden bg-cream ${className}`}>
      {slides.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.src}
          src={s.src}
          alt={i === index ? s.alt : ""}
          aria-hidden={i !== index}
          loading={i === 0 && priority ? "eager" : "lazy"}
          fetchPriority={i === 0 && priority ? "high" : "auto"}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-[900ms] ease-lux ${
            i === index ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
          }`}
        />
      ))}
      {tag && current && (
        <LookTag href={current.href} label={tag.replace("{name}", current.name)} className={tagClassName} />
      )}
    </div>
  );
}
