"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "./icons";

/**
 * Horizontal scroll-snap slider: native swipe on touch, click-and-drag with a
 * mouse, arrow buttons and a progress bar. Children are the slides.
 */
export default function Slider({
  children,
  label,
  className = "",
  trackClassName = "",
  dark = false,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  trackClassName?: string;
  dark?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    const by = slide ? slide.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * by, behavior: "smooth" });
  };

  // Mouse drag (touch already scrolls natively).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = track.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4 && !d.moved) {
      d.moved = true;
      el.dataset.dragging = "true";
      el.style.scrollSnapType = "none";
      el.style.cursor = "grabbing";
    }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    const el = track.current;
    if (el) {
      el.style.scrollSnapType = "";
      el.style.cursor = "";
    }
    // Keep `moved` for one tick so the click that ends a drag doesn't open a link.
    window.setTimeout(() => {
      drag.current = null;
      if (el) delete el.dataset.dragging;
    }, 0);
  };

  const btn = `flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-30 ${
    dark
      ? "border-cream-light/40 text-cream-light hover:bg-cream-light hover:text-ink"
      : "border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-cream-light"
  }`;

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={track}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={() => drag.current && endDrag()}
        onClickCapture={(e) => {
          if (drag.current?.moved) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain md:cursor-grab ${trackClassName}`}
      >
        {children}
      </div>

      <div className="container-lux mt-8 flex items-center gap-6">
        <div className={`h-[2px] flex-1 overflow-hidden rounded-full ${dark ? "bg-cream-light/20" : "bg-line"}`}>
          <div
            className={`h-full origin-left rounded-full transition-transform duration-300 ${dark ? "bg-cream-light" : "bg-ink"}`}
            style={{ transform: `scaleX(${Math.max(0.08, progress)})` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous" className={btn}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next" className={btn}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
