import { cn } from "@/lib/cn";

/**
 * Asymmetric Split
 *
 * The default two-column layout in most libraries is 50/50 — the ratio that
 * carries the least information. This one defaults to 7/5 so the primary column
 * is unmistakably primary, and the gutter is a visible hairline so the split is
 * legible as structure.
 *
 * On small screens the columns **recompose**: the aside moves after the main
 * content in the reading order, rather than being hidden. Hiding content on
 * mobile is how a layout becomes a redesign.
 */

export interface AsymmetricSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  main: React.ReactNode;
  aside: React.ReactNode;
  /** Secondary column ratio, out of 12. */
  ratio?: 4 | 5 | 6;
  /** Put the aside on the left. */
  asideFirst?: boolean;
  gap?: "sm" | "md" | "lg";
  /** Landmark label for the aside. */
  asideLabel?: string;
}

const RATIO_COLUMNS: Record<NonNullable<AsymmetricSplitProps["ratio"]>, string> = {
  4: "lg:grid-cols-[2fr_1fr]",
  5: "lg:grid-cols-[7fr_5fr]",
  6: "lg:grid-cols-[3fr_2fr]",
};

const GAPS: Record<NonNullable<AsymmetricSplitProps["gap"]>, string> = {
  sm: "gap-8 lg:gap-10",
  md: "gap-10 lg:gap-16",
  lg: "gap-14 lg:gap-24",
};

export function AsymmetricSplit({
  main,
  aside,
  ratio = 5,
  asideFirst = false,
  gap = "md",
  asideLabel = "Context",
  className,
  ...props
}: AsymmetricSplitProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-start",
        GAPS[gap],
        RATIO_COLUMNS[ratio],
        asideFirst ? "lg:[&>aside]:order-first" : "lg:[&>aside]:order-last",
        className,
      )}
      {...props}
    >
      <main className="min-w-0 lg:border-r lg:border-line lg:pr-10">{main}</main>
      <aside aria-label={asideLabel} className="min-w-0">
        {aside}
      </aside>
    </div>
  );
}

export default AsymmetricSplit;
