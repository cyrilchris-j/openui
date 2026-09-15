import { cn } from "@/lib/cn";

/**
 * Blueprint Grid
 *
 * Two superimposed repeating gradients: a fine cell and a coarse module. Drawn
 * with `background-image` so it costs nothing to scroll and is easy to align
 * with a layout grid — set `cell` to your baseline and `module` to your column
 * width and the background becomes documentation of the layout system.
 *
 * The grid is `aria-hidden` decoration and never sits above content: it is a
 * background layer, not a scrim.
 */

export interface BlueprintGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Fine cell size, e.g. `"24px"`. */
  cell?: string;
  /** Module size, e.g. `"96px"`. */
  module?: string;
  cellColor?: string;
  moduleColor?: string;
  children?: React.ReactNode;
}

export function BlueprintGrid({
  cell = "24px",
  module = "96px",
  cellColor = "color-mix(in oklab, var(--color-line, #100F0D) 40%, transparent)",
  moduleColor = "color-mix(in oklab, var(--color-line, #100F0D) 75%, transparent)",
  className,
  children,
  ...props
}: BlueprintGridProps) {
  return (
    <div
      className={cn("relative isolate bg-paper text-ink", className)}
      style={
        {
          backgroundImage: `
            linear-gradient(to right, ${cellColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${cellColor} 1px, transparent 1px),
            linear-gradient(to right, ${moduleColor} 1px, transparent 1px),
            linear-gradient(to bottom, ${moduleColor} 1px, transparent 1px)
          `,
          backgroundSize: `${cell} ${cell}, ${cell} ${cell}, ${module} ${module}, ${module} ${module}`,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </div>
  );
}

export default BlueprintGrid;
