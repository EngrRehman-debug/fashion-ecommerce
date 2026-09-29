"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { thumb } from "@/lib/catalog";
import { ChevronLeft, ChevronRight } from "./icons";

/** How long each photo stays up before the gallery advances on its own. */
const INTERVAL_MS = 5000;

/**
 * Product photo slider: arrows, swipe, keyboard, thumbnails and auto-advance
 * (paused while hovered, focused or being swiped, and for reduced motion).
 */
export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef<{ x: number; y: number } | null>(null);
  const reduce = useReducedMotion();
  const many = images.length > 1;
  const autoplay = many && !paused && !reduce;

  const go = useCallback(
    (i: number) => setIndex((i + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL_MS);
    return () => window.clearTimeout(t);
  }, [autoplay, index, go]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!many) return;
    start.current = { x: e.clientX, y: e.clientY };
    setPaused(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    if (Math.abs(dx) > Math.abs(e.clientY - start.current.y)) setDrag(dx);
  };
  const onPointerUp = () => {
    if (!start.current) return;
    if (drag < -50) go(index + 1);
    else if (drag > 50) go(index - 1);
    start.current = null;
    setDrag(0);
    setPaused(false);
  };

  return (
    // Desktop: thumbnails stand in a column beside the photo, and the photo is
    // sized to the screen height so the whole shot is visible without scrolling.
    <div
      className="lg:sticky lg:top-[calc(var(--header-h,97px)+24px)] lg:flex lg:items-start lg:justify-center lg:gap-3 lg:self-start"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      <div
        className="group relative aspect-[3/4] w-full touch-pan-y select-none overflow-hidden bg-cream lg:w-[min(100%,calc((100svh-250px)*0.75))] lg:max-w-[560px]"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${alt} — photos`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={() => start.current && onPointerUp()}
      >
        <div
          className={`flex h-full ${drag ? "" : "transition-transform duration-700 ease-lux"}`}
          style={{ transform: `translateX(calc(${-index * 100}% + ${drag}px))` }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="h-full w-full shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
              aria-hidden={i !== index}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={many ? `${alt} — photo ${i + 1}` : alt}
                draggable={false}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="h-full w-full object-cover object-top"
              />
            </div>
          ))}
        </div>

        {many && (
          <>
            {/* Auto-advance progress */}
            <div className="absolute inset-x-0 top-0 flex gap-1.5 p-3">
              {images.map((_, i) => (
                <span key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-cream-light/40">
                  <span
                    key={`${index}-${autoplay}`}
                    className="block h-full origin-left rounded-full bg-cream-light"
                    style={{
                      transform: i < index ? "scaleX(1)" : "scaleX(0)",
                      animation:
                        i === index && autoplay ? `progress ${INTERVAL_MS}ms linear forwards` : undefined,
                    }}
                  />
                </span>
              ))}
            </div>

            <button
              onClick={() => go(index - 1)}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream-light/90 text-ink shadow-soft backdrop-blur transition-all duration-300 hover:bg-ink hover:text-cream-light sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-cream-light/90 text-ink shadow-soft backdrop-blur transition-all duration-300 hover:bg-ink hover:text-cream-light sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <span className="absolute bottom-3 right-3 bg-ink/70 px-3 py-1.5 text-[12px] font-medium tabular-nums tracking-[0.12em] text-cream-light backdrop-blur">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {many && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto lg:order-first lg:mt-0 lg:max-h-[calc(100svh-250px)] lg:w-[72px] lg:shrink-0 lg:flex-col lg:overflow-y-auto">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => go(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index}
              className={`relative aspect-[3/4] w-[18%] min-w-[64px] shrink-0 overflow-hidden transition-opacity duration-300 lg:w-full lg:min-w-0 ${
                i === index ? "opacity-100" : "opacity-50 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumb(src)} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
              <span
                className={`absolute inset-x-0 bottom-0 h-[3px] bg-ink transition-transform duration-500 ${
                  i === index ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
