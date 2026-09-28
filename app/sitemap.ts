import type { MetadataRoute } from "next";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

/** Bump when page content changes; products use the same date until they carry their own. */
const UPDATED = new Date("2026-09-28");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") => ({
    url: absoluteUrl(path),
    lastModified: UPDATED,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/shop", 0.9, "weekly"),
    ...CATEGORIES.map((c) => page(`/shop?category=${c.id}`, 0.8, "weekly")),
    ...PRODUCTS.map((p) => ({
      ...page(`/shop/${p.slug}`, 0.7, "monthly"),
      images: p.images.map((i) => absoluteUrl(i)),
    })),
    page("/about", 0.6, "monthly"),
    page("/faq", 0.6, "monthly"),
    page("/contact", 0.5, "yearly"),
    page("/shipping-returns", 0.4, "yearly"),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
