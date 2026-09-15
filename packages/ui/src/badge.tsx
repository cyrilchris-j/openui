import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@openui/utils";

/**
 * Badge.
 *
 * A short piece of metadata attached to a resource: its design genre, its
 * difficulty, its version. It is *not* a button — the platform deliberately
 * keeps a non-interactive chip visually distinct from a control, which is why a
 * badge is square-cornered and a filter chip (in `SegmentedControl`) is not.
 *
 * Colour here is meaningful rather than decorative: `outline` for neutral
 * classification, `oxide` for a warning, `moss` for an affirmative state.
 */
const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 border px-2 py-0.5",
    "font-mono text-[10px] uppercase tracking-[0.16em]",
    "whitespace-nowrap",
  ],
  {
    variants: {
      tone: {
        neutral: "border-line text-graphite",
        ink: "border-ink bg-ink text-paper",
        oxide: "border-oxide text-oxide",
        moss: "border-moss text-moss",
        azure: "border-azure text-azure",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, tone, ...props }: BadgeProps): React.JSX.Element {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}

export { badgeVariants };
