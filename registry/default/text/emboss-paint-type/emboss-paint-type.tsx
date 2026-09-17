import { cn } from "@/lib/cn";

export interface EmbossPaintTypeProps {
  children: string;
  /** Base colour of the type. */
  color?: string;
  /** Paper colour behind it; drives the highlight and shadow tints. */
  paper?: string;
  /** Emboss depth in px. */
  depth?: number;
  className?: string;
}

/**
 * Emboss Paint Type
 *
 * The four shadows, in paint order: a light highlight up-left, a dark occlusion
 * down-right, a mid blur to seat the glyph, and a near-contact hairline. Every
 * offset is `depth * factor`, so `--emboss-depth` re-tunes the whole effect.
 */
export function EmbossPaintType({
  children,
  color = "#b9a58c",
  paper = "#f3ede2",
  depth = 2,
  className,
}: EmbossPaintTypeProps) {
  return (
    <span
      className={cn("inline-block select-none font-display leading-none", className)}
      role="text"
      aria-label={children}
      style={{
        color,
        textShadow: [
          `-${depth}px -${depth}px 0 color-mix(in oklab, ${paper}, white 26%)`,
          `${depth}px ${depth}px 0 color-mix(in oklab, ${paper}, black 42%)`,
          `0 0 ${depth * 3}px color-mix(in oklab, ${paper}, black 18%)`,
          `0 1px 0 color-mix(in oklab, ${color}, black 30%)`,
        ].join(", "),
      }}
      aria-hidden
    >
      {children}
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default EmbossPaintType;
