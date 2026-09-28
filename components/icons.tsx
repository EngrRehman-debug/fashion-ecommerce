import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const line = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function SearchIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function BagIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="M5.5 8h13l-1.1 12.1a1 1 0 0 1-1 .9H7.6a1 1 0 0 1-1-.9L5.5 8Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </svg>
  );
}

export function MenuIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="M3 7h18M3 12h18M3 17h12" />
    </svg>
  );
}

export function CloseIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function PlusIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function ArrowRight(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronLeft(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

export function ChevronRight(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function ChevronDown(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="m5 9 7 7 7-7" />
    </svg>
  );
}

export function TrashIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12M9 7V4h6v3" />
    </svg>
  );
}

export function CheckIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.8} {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function PinIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="M12 21s7-6.1 7-11.5a7 7 0 0 0-14 0C5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function ClockIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function QrIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.5} {...props}>
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2M14 18h2v2M18 18h2v2" />
    </svg>
  );
}

export function WhatsAppIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.24-8.24 8.24Z" />
    </svg>
  );
}

/** Thin outlined 4-point sparkle — the brand's small decorative mark. */
export function Sparkle(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} {...props}>
      <path
        d="M12 1.5c.7 5.6 4.9 9.8 10.5 10.5C16.9 12.7 12.7 16.9 12 22.5 11.3 16.9 7.1 12.7 1.5 12 7.1 11.3 11.3 7.1 12 1.5Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QuoteMark(props: P) {
  return (
    <svg viewBox="0 0 40 32" fill="currentColor" {...props}>
      <path d="M0 32V18C0 8 6 1.5 16 0l2 4C12 6 9 9 8.5 13H16v19H0Zm22 0V18C22 8 28 1.5 38 0l2 4c-6 2-9 5-9.5 9H40v19H22Z" />
    </svg>
  );
}

export function ReturnIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.3} {...props}>
      <path d="M3 9a9 9 0 0 1 15-4l3 3" />
      <path d="M21 3v5h-5" />
      <path d="M21 15a9 9 0 0 1-15 4l-3-3" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

export function ShieldIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.3} {...props}>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function TruckIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.3} {...props}>
      <path d="M3 6h11v9H3V6Z" />
      <path d="M14 9h4l3 3v3h-7V9Z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </svg>
  );
}

export function NeedleIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={1.3} {...props}>
      <path d="M20 4 7 17l-3 3M16 4.5a1.5 1.5 0 1 1 3 3" />
      <path d="M4 12c3-1 5 1 8 0" />
    </svg>
  );
}
