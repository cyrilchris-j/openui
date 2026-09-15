import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";

/**
 * Status Pill
 *
 * Status colours are the most commonly inaccessible thing in a dashboard: green,
 * amber and red pills that mean nothing to a colour-blind reader. This pill pairs
 * each tone with a distinct glyph and exposes an `srLabel` so the *reason* for
 * the state reaches assistive technology, not just the state.
 */

export const statusPillVariants = cva(
  "inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.16em]",
  {
    variants: {
      tone: {
        neutral: "border-line text-graphite",
        live: "border-moss text-moss",
        pending: "border-ink text-ink",
        attention: "border-oxide text-oxide",
        muted: "border-transparent bg-ink/5 text-graphite",
      },
      size: {
        sm: "text-[10px] px-1.5",
        md: "text-[11px] px-2",
      },
    },
    defaultVariants: { tone: "neutral", size: "md" },
  },
);

/** A shape per tone, so the state survives greyscale and colour blindness. */
const GLYPH: Record<NonNullable<StatusPillProps["tone"]>, string> = {
  neutral: "○",
  live: "●",
  pending: "◐",
  attention: "▲",
  muted: "—",
};

export interface StatusPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusPillVariants> {
  children: React.ReactNode;
  /** Spoken description, e.g. "Published on 12 August 2026". */
  srLabel?: string;
}

export function StatusPill({ children, tone = "neutral", size, srLabel, className, ...props }: StatusPillProps) {
  const resolvedTone = tone ?? "neutral";
  return (
    <span className={cn(statusPillVariants({ tone: resolvedTone, size }), className)} {...props}>
      <span aria-hidden="true">{GLYPH[resolvedTone]}</span>
      <span className={srLabel ? "aria-hidden:true" : undefined}>{children}</span>
      {srLabel ? <span className="sr-only">{srLabel}</span> : null}
    </span>
  );
}

export default StatusPill;
