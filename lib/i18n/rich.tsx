import { Fragment, type ReactNode } from "react";

/**
 * Render a translated heading: words in *asterisks* become the italic accent,
 * e.g. rich("Worn with *confidence*") → Worn with <em>confidence</em>.
 */
export function rich(text: string, emClassName = "text-primary"): ReactNode {
  return text.split(/\*([^*]+)\*/).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className={emClassName}>
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}
