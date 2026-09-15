import * as React from "react";

import { cn } from "@openui/utils";

/**
 * EmptyState.
 *
 * An empty screen is a design surface, not an accident. Every one on this
 * platform states three things: what would be here, why it is not, and the one
 * action that fills it. A bare "No results" wastes the moment.
 *
 * The layout is deliberately left-aligned and rule-bounded rather than a centred
 * illustration — an empty state is still part of the archive's composition.
 */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short index-style caption, e.g. "No results". */
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  /** The primary action. One, not a row of them. */
  action?: React.ReactNode;
  /** Renders the state inside an existing bordered grid cell. */
  bordered?: boolean;
}

export function EmptyState({
  eyebrow,
  title,
  description,
  action,
  bordered = true,
  className,
  ...props
}: EmptyStateProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 px-6 py-16",
        bordered && "border border-dashed border-line",
        className,
      )}
      {...props}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <p className="font-display text-step-2 leading-tight tracking-tight text-ink">{title}</p>
      {description ? (
        <p className="prose-measure text-[0.9rem] leading-relaxed text-graphite">{description}</p>
      ) : null}
      {action ? <div className="pt-2">{action}</div> : null}
    </div>
  );
}
