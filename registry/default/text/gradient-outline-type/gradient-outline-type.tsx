import { cn } from "@/lib/cn";

export interface GradientOutlineTypeProps {
  children: string;
  /** Start colour, any CSS colour. */
  from?: string;
  /** End colour, any CSS colour. */
  to?: string;
  className?: string;
}

/**
 * Gradient Outline Type
 *
 * Two stacked paint passes: `-webkit-text-stroke` cannot have a gradient, so
 * the wide pass uses a background-clipped copy at low opacity and the crisp
 * pass carries the actual stroke. The fill stays transparent so the surface
 * behind shows through — that is the point.
 */
export function GradientOutlineType({
  children,
  from = "hsl(13 76% 45%)",
  to = "hsl(214 60% 45%)",
  className,
}: GradientOutlineTypeProps) {
  return (
    <span className={cn("relative inline-block font-display leading-none", className)}>
      <span
        aria-hidden
        className="absolute inset-0 select-none opacity-40 blur-[2px]"
        style={{
          backgroundImage: `linear-gradient(120deg, ${from}, ${to})`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextStroke: "3px transparent",
        }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="relative"
        style={{
          WebkitTextStroke: `1.5px transparent`,
          backgroundImage: `linear-gradient(120deg, ${from}, ${to})`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {children}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default GradientOutlineType;
