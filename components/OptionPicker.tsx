"use client";

import type { Category, Option } from "@/lib/catalog";
import { useT } from "@/lib/i18n/client";

/** Buying-option cards and size buttons for one category. */
export default function OptionPicker({
  category,
  option,
  onOption,
  size,
  onSize,
  sizeError = false,
}: {
  category: Category;
  option: Option;
  onOption: (o: Option) => void;
  size: string | null;
  onSize: (s: string) => void;
  sizeError?: boolean;
}) {
  const t = useT();
  const p = t.m.product;
  return (
    <div className="space-y-7">
      {category.options.length > 1 && (
        <fieldset>
          <legend className="field-label">{p.option}</legend>
          <div className="grid grid-cols-2 gap-3">
            {category.options.map((o) => {
              const active = o.id === option.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => onOption(o)}
                  aria-pressed={active}
                  className={`group/opt relative flex items-start justify-between gap-3 border px-3.5 py-3.5 text-left transition-all duration-300 sm:px-4 sm:py-4 ${
                    active
                      ? "border-ink bg-ink text-cream-light"
                      : "border-line bg-white text-ink hover:border-ink"
                  }`}
                >
                  {/* Label + note on the left, price on the right — one row. */}
                  <span className="min-w-0">
                    <span className="block text-[14px] font-medium sm:text-[15px]">{o.label}</span>
                    <span
                      className={`mt-0.5 block text-[12px] sm:text-[13px] ${active ? "text-cream-light/70" : "text-muted"}`}
                    >
                      {o.note}
                    </span>
                  </span>
                  <span className="shrink-0 whitespace-nowrap font-serif text-lg leading-tight sm:text-xl">
                    {t.money(o.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {option.needsSize && (
        <fieldset>
          <div className="flex items-baseline justify-between">
            <legend className="field-label">{p.size}</legend>
            {size && <span className="text-[13px] text-muted">{p.selected(size)}</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {category.sizes.map((s) => {
              const active = s === size;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => onSize(s)}
                  aria-pressed={active}
                  className={`h-12 min-w-12 border px-4 text-[15px] font-medium transition-all duration-300 ${
                    active
                      ? "border-ink bg-ink text-cream-light"
                      : "border-line bg-white text-ink hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {sizeError && (
            <p role="alert" className="mt-2 text-[13px] text-red-700">
              {p.chooseSize}
            </p>
          )}
        </fieldset>
      )}
    </div>
  );
}

/** − 1 + quantity stepper. */
export function QtyStepper({
  value,
  onChange,
  max = 20,
  small = false,
}: {
  value: number;
  onChange: (n: number) => void;
  max?: number;
  small?: boolean;
}) {
  const p = useT().m.product;
  const h = small ? "h-9" : "h-12";
  const btn = `flex ${h} ${small ? "w-9" : "w-12"} items-center justify-center text-lg text-ink transition-colors hover:bg-cream disabled:opacity-30`;
  return (
    <div className="inline-flex items-center border border-line bg-white">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={p.decrease}>
        −
      </button>
      <span className={`${small ? "w-8 text-sm" : "w-10 text-[15px]"} text-center font-medium tabular-nums`} aria-live="polite">
        {value}
      </span>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={p.increase}>
        +
      </button>
    </div>
  );
}
