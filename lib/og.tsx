/**
 * Shared renderer for the per-page Open Graph images (app/**\/opengraph-image.tsx).
 * Runs at build time on the Node.js runtime.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const INK = "#15171B";
const IVORY = "#FAF7F2";
const INDIGO = "#1B5BB0";
const GOLD = "#A8834A";

/** Satori can't read WebP, so public images are converted to a PNG/JPEG data URI. */
async function dataUri(publicPath: string, width: number, format: "png" | "jpeg" = "jpeg") {
  const file = await readFile(path.join(process.cwd(), "public", publicPath));
  const buf = await sharp(file).resize({ width })[format]({ quality: 85 }).toBuffer();
  return `data:image/${format};base64,${buf.toString("base64")}`;
}

/** Cormorant Garamond from Google Fonts; falls back to the default font if offline. */
let serif: Promise<ArrayBuffer | null> | null = null;
function loadSerif() {
  serif ??= (async () => {
    try {
      const css = await (
        await fetch("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&display=swap")
      ).text();
      const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
      return url ? await (await fetch(url)).arrayBuffer() : null;
    } catch {
      return null;
    }
  })();
  return serif;
}

export async function renderOg({
  eyebrow,
  title,
  subtitle,
  image,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Public path of a photo for the right-hand panel. */
  image: string;
  /** Small line at the bottom left, e.g. a price. */
  footer?: string;
}) {
  const [logo, photo, font] = await Promise.all([
    dataUri("/images/logo.webp", 220, "png"),
    dataUri(image, 520),
    loadSerif(),
  ]);
  const serifFamily = font ? "Cormorant" : "serif";

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: IVORY, color: INK }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "56px 64px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={120} height={93} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 20, letterSpacing: 6, textTransform: "uppercase", color: INDIGO }}>
              <div style={{ width: 44, height: 2, background: INDIGO }} />
              {eyebrow}
            </div>
            <div style={{ display: "flex", marginTop: 22, fontFamily: serifFamily, fontSize: title.length > 26 ? 70 : 88, lineHeight: 1, letterSpacing: -1 }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ display: "flex", marginTop: 24, fontSize: 26, lineHeight: 1.4, color: "#3B3E45", maxWidth: 560 }}>
                {subtitle}
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `2px solid #E2DACD`, paddingTop: 22, fontSize: 20, letterSpacing: 3, textTransform: "uppercase" }}>
            <span style={{ color: GOLD }}>{footer ?? "Hand-dyed in Malaysia"}</span>
            <span style={{ color: "#6F6A62" }}>CWSK Enterprises</span>
          </div>
        </div>
        <div style={{ display: "flex", width: 440, height: "100%", background: INK, padding: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" width={404} height={594} style={{ objectFit: "cover", objectPosition: "top" }} />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: font ? [{ name: "Cormorant", data: font, weight: 500, style: "normal" }] : undefined,
    }
  );
}
