"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import navigation from "@/data/navigation.json";
import {
  AUDIENCES,
  cardPriceText,
  categoriesFor,
  categoryCover,
  designs,
  productsFor,
  productsIn,
  thumb,
  type Audience,
  type Category,
} from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site";
import { ArrowRight, BagIcon, CloseIcon, MenuIcon, SearchIcon, WhatsAppIcon } from "./icons";

const { links, announcements } = navigation;
const EASE = [0.22, 1, 0.36, 1] as const;

/** Men's and women's ranges, kept apart in both menus. */
const GROUPS = AUDIENCES.map((a) => ({ ...a, ranges: categoriesFor(a.id) })).filter((g) => g.ranges.length);

/* ---------- Desktop mega menus: one per nav link with a `mega` key ---------- */

type MegaKey = "all" | Audience;
type MegaItem = { href: string; img: string; name: string; sub: string };
type MegaPanel = {
  eyebrow: string;
  title: string;
  href: string;
  cta: string;
  sections: { label: string; href: string; items: MegaItem[] }[];
};

const MEGA_COLUMNS = 6;

const rangeItem = (c: Category): MegaItem => ({
  href: `/shop?category=${c.id}`,
  img: thumb(categoryCover(c)),
  name: c.name,
  sub: designs(productsIn(c.id).length),
});

/** Shop: every range, grouped by audience. Men / Women: their ranges, topped up with their newest designs. */
const MEGA: Record<MegaKey, MegaPanel> = {
  all: {
    eyebrow: "The Collection",
    title: "Shop by range",
    href: "/shop",
    cta: "Shop all",
    sections: GROUPS.map((g) => ({ label: g.label, href: `/shop?for=${g.id}`, items: g.ranges.map(rangeItem) })),
  },
  ...(Object.fromEntries(
    AUDIENCES.map((a) => {
      const ranges = categoriesFor(a.id);
      const latest = productsFor(a.id)
        .reverse()
        .slice(0, Math.max(0, MEGA_COLUMNS - ranges.length))
        .map((p) => ({ href: `/shop/${p.slug}`, img: thumb(p.images[0]), name: p.name, sub: cardPriceText(p) }));
      const href = `/shop?for=${a.id}`;
      return [
        a.id,
        {
          eyebrow: `For ${a.label.toLowerCase()}`,
          title: a.title,
          href,
          cta: `Shop all ${a.label.toLowerCase()}`,
          sections: [
            { label: "Ranges", href, items: ranges.map(rangeItem) },
            { label: "New in", href, items: latest },
          ].filter((sec) => sec.items.length),
        },
      ];
    })
  ) as Record<Audience, MegaPanel>),
};

export default function Navbar() {
  const pathname = usePathname();
  const { count, ready, openDrawer, setSearchOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mega, setMega] = useState<MegaKey | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Publish the header height as --header-h so sticky bars can sit right under it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setMega(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* Announcement strip */}
      <div className="relative z-50 overflow-hidden bg-ink py-2.5 text-cream-light">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.24em]">
          {[...announcements, ...announcements, ...announcements, ...announcements].map((a, i) => (
            <span key={i} className="flex items-center gap-12">
              {a}
              <span className="text-gold-light">✦</span>
            </span>
          ))}
        </div>
      </div>

      <header
        ref={headerRef}
        onMouseLeave={() => setMega(null)}
        className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
          scrolled || mega
            ? "border-line bg-cream-light/95 shadow-soft backdrop-blur-md"
            : "border-transparent bg-cream-light"
        }`}
      >
        <div
          className={`container-lux grid grid-cols-[1fr_auto_1fr] items-center transition-all duration-500 ${
            scrolled ? "py-2.5" : "py-3.5 lg:py-4"
          }`}
        >
          {/* Left: menu button (mobile) / links (desktop) */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="-ml-2 p-2 text-ink lg:hidden"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <nav className="hidden items-center gap-6 lg:flex xl:gap-9" aria-label="Main">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setMega(link.mega ? (link.mega as MegaKey) : null)}
                  className={`link-underline py-2 text-[13px] font-medium uppercase tracking-[0.2em] transition-colors hover:text-primary ${
                    (mega ? mega === link.mega : isActive(link.href)) ? "text-primary after:scale-x-100" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Centre: logo */}
          <Link href="/" aria-label="CWSK Enterprises — home" className="flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.webp"
              alt="CWSK Enterprises"
              width={206}
              height={160}
              className={`w-auto transition-all duration-500 ${
                scrolled ? "h-11 sm:h-12" : "h-12 sm:h-16"
              }`}
            />
          </Link>

          {/* Right: search + cart */}
          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="group flex items-center gap-2 p-2 text-ink transition-colors hover:text-primary"
            >
              <SearchIcon className="h-[22px] w-[22px]" />
              <span className="hidden text-[13px] font-medium uppercase tracking-[0.2em] xl:inline">Search</span>
            </button>
            <button
              onClick={openDrawer}
              aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
              className="group relative flex items-center gap-2 p-2 text-ink transition-colors hover:text-primary"
            >
              <BagIcon className="h-[22px] w-[22px]" />
              <span className="hidden text-[13px] font-medium uppercase tracking-[0.2em] xl:inline">Cart</span>
              <AnimatePresence>
                {ready && count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 22 }}
                    className="absolute right-0 top-0.5 flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold leading-none text-white xl:static xl:-ml-0.5"
                  >
                    {count > 99 ? "99+" : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Desktop mega menu: the hovered link's panel of photos */}
        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-x-0 top-full hidden border-b border-line bg-cream-light shadow-card lg:block"
            >
              <motion.div
                key={mega}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="container-lux grid grid-cols-[220px_1fr] gap-10 py-10"
              >
                <MegaContent panel={MEGA[mega]} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              aria-label="Mobile"
              className="fixed inset-y-0 left-0 z-[70] flex w-[86%] max-w-sm flex-col overflow-y-auto bg-cream-light lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="flex items-center justify-between border-b border-line px-6 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/logo.webp" alt="CWSK Enterprises" className="h-11 w-auto" />
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="-mr-2 p-2 text-ink">
                  <CloseIcon className="h-6 w-6" />
                </button>
              </div>

              <ul className="px-6 py-4">
                {[{ label: "Home", href: "/" }, ...links].map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center justify-between border-b border-line py-4 font-serif text-[26px] ${
                        isActive(link.href) ? "text-primary" : "text-ink"
                      }`}
                    >
                      {link.label}
                      <ArrowRight className="h-5 w-5 text-muted" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {GROUPS.map((g) => (
                <div key={g.id} className="mt-6 px-6 first:mt-0">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">{g.label}</p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {g.ranges.map((c) => (
                      <Link key={c.id} href={`/shop?category=${c.id}`} className="group relative block aspect-[4/5] overflow-hidden bg-cream">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={thumb(categoryCover(c))} alt="" className="h-full w-full object-cover object-top" />
                        <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                        <span className="absolute inset-x-3 bottom-3 font-serif text-lg leading-tight text-cream-light">{c.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-6 mb-8 mt-8 flex items-center gap-3 border border-line bg-white px-4 py-4 text-ink"
              >
                <WhatsAppIcon className="h-6 w-6 text-[#25D366]" />
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-muted">Order & enquiries</span>
                  <span className="text-[15px] font-medium">{WHATSAPP_DISPLAY}</span>
                </span>
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MegaContent({ panel }: { panel: MegaPanel }) {
  const columns = panel.sections.reduce((n, sec) => n + sec.items.length, 0);
  return (
    <>
      <div>
        <p className="eyebrow">{panel.eyebrow}</p>
        <p className="mt-4 font-serif text-3xl leading-tight text-ink">{panel.title}</p>
        <Link href={panel.href} className="link-underline mt-6 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-ink">
          {panel.cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {/* One column per tile; each section spans its own tiles under a heading. */}
      <div className="grid gap-x-5" style={{ gridTemplateColumns: `repeat(${Math.max(columns, MEGA_COLUMNS)}, minmax(0, 1fr))` }}>
        {panel.sections.map((sec, si) => (
          <div
            key={sec.label}
            className={`grid gap-x-5 ${si > 0 ? "border-l border-line pl-5" : ""}`}
            style={{ gridColumn: `span ${sec.items.length}`, gridTemplateColumns: `repeat(${sec.items.length}, minmax(0, 1fr))` }}
          >
            <Link
              href={sec.href}
              className="mb-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-ink hover:text-primary"
              style={{ gridColumn: `span ${sec.items.length}` }}
            >
              {sec.label} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            {sec.items.map((item) => (
              <Link key={item.href} href={item.href} className="group block">
                <div className="aspect-[4/5] overflow-hidden bg-cream">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-lux group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 font-serif text-lg text-ink group-hover:text-primary">{item.name}</p>
                <p className="text-[13px] text-muted">{item.sub}</p>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
