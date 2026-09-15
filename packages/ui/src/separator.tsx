import * as React from "react";

import { Separator as Primitive } from "@openui/primitives";
import { cn } from "@openui/utils";

/**
 * Separator.
 *
 * Wraps the Radix primitive with the platform's hairline weight. The
 * `decorative` prop passes straight through, and the default is the honest one:
 * a rule drawn for rhythm is decorative and must not be announced as a landmark.
 *
 * An optional `label` renders the rule as an *indexed divider* — a short
 * monospace caption followed by a hairline. That form divides the major sections
 * of the marketing and documentation pages.
 */
export interface SeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Primitive.Root>, "orientation"> {
  label?: string;
  orientation?: "horizontal" | "vertical";
}

export function Separator({
  className,
  label,
  decorative = true,
  orientation = "horizontal",
  ...props
}: SeparatorProps): React.JSX.Element {
  if (label && orientation === "horizontal") {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <span className="eyebrow shrink-0">{label}</span>
        <Primitive.Root decorative={decorative} orientation="horizontal" className="h-px w-full bg-line" />
      </div>
    );
  }

  return (
    <Primitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        orientation === "vertical" ? "h-full w-px bg-line" : "h-px w-full bg-line",
        className,
      )}
      {...props}
    />
  );
}
