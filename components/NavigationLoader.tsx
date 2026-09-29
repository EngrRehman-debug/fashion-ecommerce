"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DotsLoader from "./Loader";

const START_EVENT = "cwsk:navigation-start";

/** Call before a programmatic router.push() so the page loader shows too. */
export function startNavigationLoader() {
  window.dispatchEvent(new Event(START_EVENT));
}

/** Wait this long before showing anything, so instant navigations don't flash. */
const SHOW_AFTER_MS = 150;
/** Never leave the overlay up if a navigation silently fails. */
const GIVE_UP_AFTER_MS = 10_000;

/**
 * Full-screen loader between pages. Starts when an internal link is clicked
 * and ends when the new URL (path or query) is in place.
 */
export default function NavigationLoader() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const [visible, setVisible] = useState(false);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  // New URL rendered → done.
  useEffect(() => {
    clear();
    setVisible(false);
  }, [pathname, search]);

  useEffect(() => {
    const start = () => {
      clear();
      timers.current.push(
        window.setTimeout(() => setVisible(true), SHOW_AFTER_MS),
        window.setTimeout(() => setVisible(false), GIVE_UP_AFTER_MS)
      );
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download")) return;
      // The click that ends a slider drag does not navigate.
      if (a.closest("[data-dragging=\"true\"]")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (or just a #section on it): nothing to wait for.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      if (/\.(xml|txt|webp|png|jpg|pdf)$/i.test(url.pathname)) return;
      start();
    };
    // Capture phase: runs before next/link calls preventDefault() on its own clicks.
    document.addEventListener("click", onClick, true);
    window.addEventListener(START_EVENT, start);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(START_EVENT, start);
      clear();
    };
  }, []);

  // Plain CSS fade (not an exit animation), so hiding never depends on
  // animation frames — the overlay can never get stuck on screen.
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[90] flex items-center justify-center bg-cream-light/80 backdrop-blur-sm transition-opacity duration-300 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {visible && <DotsLoader size={16} label="Loading page" />}
    </div>
  );
}
