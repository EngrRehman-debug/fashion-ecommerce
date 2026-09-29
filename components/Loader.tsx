/** Three dots bouncing on their own lines — the site's loading indicator. */
export default function DotsLoader({
  size = 14,
  label = "Loading",
  className = "text-ink/70",
}: {
  /** Dot diameter in px; everything else scales from it. */
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <span role="status" aria-label={label} className={`dots-loader ${className}`} style={{ ["--dot-size" as string]: `${size}px` }}>
      <span style={{ ["--d" as string]: "0s" }} />
      <span style={{ ["--d" as string]: "0.18s" }} />
      <span style={{ ["--d" as string]: "0.36s" }} />
    </span>
  );
}
