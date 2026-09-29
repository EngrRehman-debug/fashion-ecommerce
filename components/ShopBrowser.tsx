"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import {
  CATEGORIES,
  PRODUCTS,
  designs,
  familiesFor,
  fromPrice,
  getCategory,
  searchProducts,
  type Product,
} from "@/lib/catalog";
import { FAMILY_SWATCH } from "@/lib/colors";
import { PRODUCT_GRID } from "@/lib/ui";
import { CloseIcon, SearchIcon } from "./icons";

const PAGE_SIZE = 24;
const EASE = [0.22, 1, 0.36, 1] as const;

type Sort = "featured" | "az" | "za" | "price-asc" | "price-desc";

const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "az", label: "Name A–Z" },
  { id: "za", label: "Name Z–A" },
];


const RANGES = [{ id: "all", name: "All" }, ...CATEGORIES];

const priceOf = (p: Product) => fromPrice(getCategory(p.category)!) ?? Number.POSITIVE_INFINITY;

function filterProducts(category: string, family: string, query: string, sort: Sort) {
  const pool = query.trim() ? searchProducts(query) : PRODUCTS;
  const list = pool.filter(
    (p) => (category === "all" || p.category === category) && (family === "all" || p.family === family)
  );
  switch (sort) {
    case "az":
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    case "za":
      return [...list].sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return [...list].sort((a, b) => priceOf(a) - priceOf(b));
    case "price-desc":
      return [...list].sort((a, b) => priceOf(b) - priceOf(a));
    default:
      return list;
  }
}

export default function ShopBrowser({
  initialCategory = "all",
  initialQuery = "",
}: {
  initialCategory?: string;
  initialQuery?: string;
}) {
  const router = useRouter();
  const [category, setCategory] = useState<string>(initialCategory);
  const [family, setFamily] = useState<string>("all");
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<Sort>("featured");
  const [shown, setShown] = useState(PAGE_SIZE);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Follow the URL when it changes from outside (navbar search, mega menu).
  useEffect(() => {
    setQuery(initialQuery);
    setShown(PAGE_SIZE);
  }, [initialQuery]);
  useEffect(() => {
    setCategory(initialCategory);
    setFamily("all");
    setShown(PAGE_SIZE);
  }, [initialCategory]);

  useEffect(() => {
    document.documentElement.style.overflow = sheetOpen ? "hidden" : "";
  }, [sheetOpen]);

  const families = useMemo(() => familiesFor(category === "all" ? undefined : category), [category]);
  const results = useMemo(() => filterProducts(category, family, query, sort), [category, family, query, sort]);

  // Keep the URL in step so the header, links and back button follow along.
  const syncUrl = (cat: string, q: string) => {
    const params = new URLSearchParams();
    if (cat !== "all") params.set("category", cat);
    if (q.trim()) params.set("q", q.trim());
    const qs = params.toString();
    router.replace(qs ? `/shop?${qs}` : "/shop", { scroll: false });
  };

  const apply = (next: { category?: string; family?: string; sort?: Sort; query?: string }) => {
    const cat = next.category ?? category;
    const q = next.query ?? query;
    if (next.category !== undefined && next.category !== category) {
      setCategory(cat);
      setFamily("all");
    }
    if (next.family !== undefined) setFamily(next.family);
    if (next.sort !== undefined) setSort(next.sort);
    if (next.query !== undefined) setQuery(q);
    setShown(PAGE_SIZE);
    if (next.category !== undefined || next.query !== undefined) syncUrl(cat, q);
  };

  const clearAll = () => apply({ category: "all", family: "all", query: "", sort: "featured" });

  const visible = results.slice(0, shown);
  const activeCount = Number(category !== "all") + Number(family !== "all") + Number(sort !== "featured");
  const filtered = category !== "all" || family !== "all" || query.trim() !== "";

  const searchBox = (
    <label className="relative block flex-1 lg:w-64 lg:flex-none">
      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShown(PAGE_SIZE);
        }}
        onBlur={() => syncUrl(category, query)}
        placeholder="Search prints…"
        aria-label="Search prints"
        className="w-full border border-line bg-white py-3 pl-10 pr-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink lg:py-2.5"
      />
    </label>
  );

  return (
    <>
      {/* ---------- Desktop: sticky filter bar ---------- */}
      <div className="sticky top-[var(--header-h,69px)] z-30 -mx-10 hidden border-b border-line bg-cream-light/95 px-10 py-4 backdrop-blur-md lg:block 2xl:-mx-14 2xl:px-14">
        <div className="flex flex-wrap gap-2">
          {RANGES.map((c) => (
            <Chip key={c.id} active={category === c.id} onClick={() => apply({ category: c.id })}>
              {c.name}
            </Chip>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[12px] font-medium uppercase tracking-[0.18em] text-muted">Colour</span>
            <Swatch active={family === "all"} onClick={() => apply({ family: "all" })} label="All" />
            {families.map((f) => (
              <Swatch key={f} active={family === f} onClick={() => apply({ family: f })} label={f} color={FAMILY_SWATCH[f]} />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {searchBox}
            <select
              value={sort}
              onChange={(e) => apply({ sort: e.target.value as Sort })}
              aria-label="Sort products"
              className="border border-line bg-white px-3 py-2.5 text-[15px] text-ink outline-none focus:border-ink"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ---------- Mobile / tablet: search + filter button + active chips ---------- */}
      {/* Sticks under the navbar while scrolling, so search + filter stay in reach. */}
      <div className="sticky top-[var(--header-h,64px)] z-30 -mx-4 border-b border-line bg-cream-light/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden">
        <div className="flex gap-2">
          {searchBox}
          <button
            onClick={() => setSheetOpen(true)}
            className="relative flex shrink-0 items-center gap-2 border border-ink bg-ink px-4 text-[13px] font-medium uppercase tracking-[0.14em] text-cream-light"
          >
            <FilterIcon />
            Filter
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cream-light px-1 text-[11px] text-ink">
                {activeCount}
              </span>
            )}
          </button>
        </div>
        {(category !== "all" || family !== "all") && (
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
            {category !== "all" && (
              <ActiveChip onRemove={() => apply({ category: "all" })}>{getCategory(category)?.name}</ActiveChip>
            )}
            {family !== "all" && <ActiveChip onRemove={() => apply({ family: "all" })}>{family}</ActiveChip>}
          </div>
        )}
      </div>

      {/* Count + clear */}
      <div className="mt-6 flex items-center justify-between lg:mt-8">
        <p className="text-[13px] uppercase tracking-[0.18em] text-muted">
          {designs(results.length)}
          {query.trim() && <> for “{query.trim()}”</>}
        </p>
        {filtered && (
          <button onClick={clearAll} className="flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.14em] text-ink hover:text-primary">
            <CloseIcon className="h-4 w-4" /> Clear
          </button>
        )}
      </div>

      {/* Grid */}
      {results.length === 0 ? (
        <div className="py-28 text-center">
          <p className="font-serif text-4xl text-ink">No prints match that.</p>
          <p className="mt-3 text-[16px] text-muted">Try another colour or range.</p>
          <button onClick={clearAll} className="btn-outline mt-8">
            <span>Clear filters</span>
          </button>
        </div>
      ) : (
        // Keyed by the filters: a new selection swaps the whole grid at once and
        // fades the new cards in. (No exit animations — old cards must never linger.)
        <div key={`${category}|${family}|${sort}|${query}`} className={`mt-6 ${PRODUCT_GRID}`}>
          {visible.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: Math.min(i % PAGE_SIZE, 12) * 0.03 }}
            >
              <ProductCard product={p} priority={i < 6} highlight={query} />
            </motion.div>
          ))}
        </div>
      )}

      {/* Load more */}
      {shown < results.length && (
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-[13px] text-muted">
            Showing {visible.length} of {results.length}
          </p>
          <div className="h-px w-48 bg-line">
            <div className="h-px bg-ink transition-all duration-500" style={{ width: `${(visible.length / results.length) * 100}%` }} />
          </div>
          <button onClick={() => setShown((n) => n + PAGE_SIZE)} className="btn-outline mt-2">
            <span>Load more</span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {sheetOpen && (
          <FilterSheet
            key="sheet"
            category={category}
            family={family}
            sort={sort}
            query={query}
            onClose={() => setSheetOpen(false)}
            onApply={(next) => {
              apply(next);
              setSheetOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------ mobile sheet */

/** Bottom sheet: choices are drafted here and applied together. */
function FilterSheet({
  category,
  family,
  sort,
  query,
  onClose,
  onApply,
}: {
  category: string;
  family: string;
  sort: Sort;
  query: string;
  onClose: () => void;
  onApply: (next: { category: string; family: string; sort: Sort }) => void;
}) {
  const [cat, setCat] = useState(category);
  const [fam, setFam] = useState(family);
  const [srt, setSrt] = useState<Sort>(sort);
  const fams = useMemo(() => familiesFor(cat === "all" ? undefined : cat), [cat]);
  const count = useMemo(() => filterProducts(cat, fam, query, srt).length, [cat, fam, query, srt]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px] lg:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Filter and sort"
        className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[88svh] flex-col rounded-t-2xl bg-cream-light lg:hidden"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.5, ease: EASE }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => info.offset.y > 120 && onClose()}
      >
        <div className="flex justify-center pt-3">
          <span className="h-1 w-10 rounded-full bg-sand" />
        </div>
        <header className="flex items-center justify-between border-b border-line px-5 pb-4 pt-3">
          <h2 className="font-serif text-2xl text-ink">Filter & sort</h2>
          <button onClick={onClose} aria-label="Close filters" className="-mr-2 p-2 text-ink">
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>

        <div className="flex-1 space-y-8 overflow-y-auto px-5 py-6">
          <section>
            <h3 className="field-label">Range</h3>
            <div className="flex flex-wrap gap-2">
              {RANGES.map((c) => (
                <Chip
                  key={c.id}
                  active={cat === c.id}
                  onClick={() => {
                    setCat(c.id);
                    setFam("all");
                  }}
                >
                  {c.name}
                </Chip>
              ))}
            </div>
          </section>

          <section>
            <h3 className="field-label">Colour</h3>
            <div className="flex flex-wrap gap-2">
              <Swatch active={fam === "all"} onClick={() => setFam("all")} label="All" />
              {fams.map((f) => (
                <Swatch key={f} active={fam === f} onClick={() => setFam(f)} label={f} color={FAMILY_SWATCH[f]} />
              ))}
            </div>
          </section>

          <section>
            <h3 className="field-label">Sort by</h3>
            <div className="divide-y divide-line border-y border-line">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSrt(s.id)}
                  className="flex w-full items-center justify-between py-3.5 text-left text-[15px] text-ink"
                >
                  {s.label}
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      srt === s.id ? "border-ink" : "border-sand"
                    }`}
                  >
                    {srt === s.id && <span className="h-2.5 w-2.5 rounded-full bg-ink" />}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <footer className="grid grid-cols-[auto_1fr] gap-3 border-t border-line bg-white px-5 py-4">
          <button
            onClick={() => {
              setCat("all");
              setFam("all");
              setSrt("featured");
            }}
            className="btn-outline px-5"
          >
            <span>Reset</span>
          </button>
          <button onClick={() => onApply({ category: cat, family: fam, sort: srt })} className="btn-primary px-4" disabled={count === 0}>
            <span>{count === 0 ? "No matches" : `Show ${designs(count)}`}</span>
          </button>
        </footer>
      </motion.div>
    </>
  );
}

/* --------------------------------------------------------------- controls */

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`border px-4 py-2.5 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
        active ? "border-ink bg-ink text-cream-light" : "border-line bg-white text-ink hover:border-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Swatch({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color?: string }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 rounded-full border py-1.5 text-[13px] transition-colors ${color ? "pl-1.5 pr-3.5" : "px-3.5"} ${
        active ? "border-ink bg-ink text-cream-light" : "border-line bg-white text-ink hover:border-ink"
      }`}
    >
      {color && <span className="h-5 w-5 rounded-full border border-ink/10" style={{ background: color }} />}
      {label}
    </button>
  );
}

function ActiveChip({ onRemove, children }: { onRemove: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onRemove}
      className="flex shrink-0 items-center gap-2 rounded-full border border-ink/20 bg-white py-1.5 pl-3.5 pr-2.5 text-[13px] text-ink"
    >
      {children}
      <CloseIcon className="h-3.5 w-3.5" />
    </button>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </svg>
  );
}
