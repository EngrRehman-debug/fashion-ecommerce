import Link from "next/link";
import { ArrowRight } from "./icons";

/**
 * Round arrow button pinned to the corner of an editorial photo, linking to
 * the product shown. The label is for screen readers and the hover tooltip.
 */
export default function LookTag({
  href,
  label = "Shop the look",
  className = "bottom-3 right-3 h-11 w-11",
}: {
  href: string;
  label?: string;
  /** Position and size, e.g. "bottom-2 right-2 h-9 w-9". */
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={`group/tag absolute z-10 flex items-center justify-center rounded-full bg-cream-light/90 text-ink shadow-soft backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:bg-ink hover:text-cream-light ${className}`}
    >
      <ArrowRight className="h-[45%] w-[45%] -rotate-45 transition-transform duration-500 group-hover/tag:rotate-0" />
    </Link>
  );
}
