"use client";

/**
 * Cart + shopping UI state, persisted to localStorage.
 *
 * A cart line is a product in one buying option (and size, where the option
 * needs one). Prices are looked up from the catalogue at render time, so a
 * price change in data/categories.json is reflected in carts already saved.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getCategory, getProduct, type Category, type Option, type Product } from "./catalog";

const STORAGE_KEY = "cwsk-cart-v1";

export type CartItem = {
  slug: string;
  optionId: string;
  size: string | null;
  qty: number;
};

/** A cart item joined with its catalogue data. */
export type CartLine = CartItem & {
  key: string;
  product: Product;
  category: Category;
  option: Option;
  /** Line total, or null while the option's price is still to be confirmed. */
  total: number | null;
};

export const MAX_QTY = 20;

export const lineKey = (i: Pick<CartItem, "slug" | "optionId" | "size">) =>
  `${i.slug}|${i.optionId}|${i.size ?? ""}`;

type CartContextValue = {
  /** False until the saved cart has been read — avoids a flash of "0". */
  ready: boolean;
  lines: CartLine[];
  count: number;
  /** Sum of all priced lines. */
  subtotal: number;
  /** True when at least one line has no price yet. */
  hasUnpriced: boolean;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;

  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;

  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  /** Product whose option/size picker is open from a product card. */
  quickAdd: Product | null;
  openQuickAdd: (product: Product) => void;
  closeQuickAdd: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickAdd, setQuickAdd] = useState<Product | null>(null);

  // Load once, then follow changes made in other tabs.
  useEffect(() => {
    setItems(readStorage());
    setReady(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Private mode / storage full — the cart still works for this visit.
    }
  }, [items, ready]);

  // Lock page scroll while an overlay is open.
  const overlayOpen = drawerOpen || searchOpen || quickAdd !== null;
  useEffect(() => {
    document.documentElement.style.overflow = overlayOpen ? "hidden" : "";
  }, [overlayOpen]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const key = lineKey(item);
      const found = prev.find((i) => lineKey(i) === key);
      if (found)
        return prev.map((i) =>
          lineKey(i) === key ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i
        );
      return [...prev, { ...item, qty: Math.min(MAX_QTY, qty) }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => lineKey(i) !== key)
        : prev.map((i) => (lineKey(i) === key ? { ...i, qty: Math.min(MAX_QTY, qty) } : i))
    );
  }, []);

  const remove = useCallback(
    (key: string) => setItems((prev) => prev.filter((i) => lineKey(i) !== key)),
    []
  );
  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo(() => {
    const out: CartLine[] = [];
    for (const item of items) {
      // Drop lines whose product or option has since been removed from the data.
      const product = getProduct(item.slug);
      const category = product && getCategory(product.category);
      const option = category?.options.find((o) => o.id === item.optionId);
      if (!product || !category || !option) continue;
      out.push({
        ...item,
        key: lineKey(item),
        product,
        category,
        option,
        total: option.price === null ? null : option.price * item.qty,
      });
    }
    return out;
  }, [items]);

  const value: CartContextValue = {
    ready,
    lines,
    count: lines.reduce((n, l) => n + l.qty, 0),
    subtotal: lines.reduce((n, l) => n + (l.total ?? 0), 0),
    hasUnpriced: lines.some((l) => l.total === null),
    add,
    setQty,
    remove,
    clear,
    drawerOpen,
    openDrawer: useCallback(() => setDrawerOpen(true), []),
    closeDrawer: useCallback(() => setDrawerOpen(false), []),
    searchOpen,
    setSearchOpen,
    quickAdd,
    openQuickAdd: useCallback((p: Product) => setQuickAdd(p), []),
    closeQuickAdd: useCallback(() => setQuickAdd(null), []),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

/** Whether a product can go straight into the cart without choosing anything. */
export function needsChoice(category: Category) {
  return category.options.length > 1 || category.options.some((o) => o.needsSize);
}
