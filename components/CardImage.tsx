"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n/client";
import DotsLoader from "./Loader";

/**
 * Product-card photo with the bouncing-dots loader until it has loaded.
 * Used on product cards only — editorial images (hero, about) load without it.
 */
export default function CardImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  fetchPriority,
  loaderSize = 10,
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  loaderSize?: number;
}) {
  const t = useT();
  const img = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Cached images can finish before React attaches onLoad.
  useEffect(() => {
    setLoaded(Boolean(img.current?.complete && img.current.naturalWidth));
  }, [src]);

  return (
    <>
      {!loaded && (
        <span className="absolute inset-0 flex items-center justify-center bg-cream">
          <DotsLoader size={loaderSize} label={t.m.common.loadingImage(alt)} className="text-ink/45" />
        </span>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={img}
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
