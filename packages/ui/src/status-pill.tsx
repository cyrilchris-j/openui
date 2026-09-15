import * as React from "react";

import { cn } from "@openui/utils";

/**
 * StatusPill.
 *
 * The one place on the platform where a fully round shape is allowed, and it is
 * allowed because it carries meaning: a *state*, not an action. The shape is the
 * affordance — round reads as "this is a status", square reads as "this is a
 * control" — which is why `Badge` and `StatusPill` look different despite both
 * being short text chips.
 *
 * The dot is not decoration. Colour alone fails for a colour-blind user and for
 * anyone reading a printed page, so each state also carries a distinct label.
 */
const TONES = {
  neutral: "border-line text-graphite",
  positive: "border-moss/40 text-moss",
  warning: "border-oxide/40 text-oxide",
  critical: "border-oxide bg-oxide text-paper",
  info: "border-azure/40 text-azure",
} as const;

export type StatusTone = keyof typeof TONES;

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The state's human label, e.g. "Published". */
  children: React.ReactNode;
  tone?: StatusTone;
  /** Suppresses the leading dot for dense contexts such as a table row. */
  bare?: boolean;
}

export function StatusPill({
  children,
  tone = "neutral",
  bare = false,
  className,
  ...props
}: StatusPillProps): React.JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-0.5",
        "font-mono text-[10px] uppercase tracking-[0.16em]",
        TONES[tone],
        className,
      )}
      {...props}
    >
      {bare ? null : <span aria-hidden className="h-1.5 w-1.5 rounded-pill bg-current" />}
      {children}
    </span>
  );
}

/**
 * Maps a domain status onto a tone.
 *
 * Kept here rather than in the API layer because tone is a presentation
 * decision: the same `deprecated` status may be a warning on a detail page and
 * neutral in a historical list.
 */
export const RESOURCE_STATUS_TONE: Record<string, StatusTone> = {
  draft: "neutral",
  reviewing: "info",
  published: "positive",
  deprecated: "warning",
  rejected: "critical",
  archived: "neutral",
};

export const SUBMISSION_STATUS_TONE: Record<string, StatusTone> = {
  pending: "info",
  reviewing: "info",
  approved: "positive",
  rejected: "critical",
  changes_requested: "warning",
};
