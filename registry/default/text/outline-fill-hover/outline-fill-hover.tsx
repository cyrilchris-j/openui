import { cn } from "@/lib/cn";

export interface OutlineFillHoverProps {
  children: string;
  /** Stroke colour at rest. */
  stroke?: string;
  /** Fill colour swept in on hover. */
  fill?: string;
  href?: string;
  className?: string;
}

export function OutlineFillHover({
  children,
  stroke = "currentColor",
  fill = "#e2624a",
  href = "#",
  className,
}: OutlineFillHoverProps) {
  return (
    <a
      href={href}
      className={cn("group relative inline-block font-display leading-none", className)}
      aria-label={children}
    >
      <span
        aria-hidden
        className="inline-block"
        style={{ WebkitTextStroke: `1.5px ${stroke}`, color: "transparent" }}
      >
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 overflow-hidden whitespace-nowrap"
        style={{
          color: fill,
          clipPath: "inset(0 100% 0 0)",
          transition: "clip-path 420ms cubic-bezier(0.2, 0, 0, 1)",
        }}
      >
        <span className="group-hover:[clip-path:inset(0_0_0_0)]" style={{ display: "inline-block" }}>
          {children}
        </span>
      </span>
      <style>{`.group:hover .absolute { clip-path: inset(0 0 0 0) !important; } @media (prefers-reduced-motion: reduce) { .absolute { transition: none !important } }`}</style>
      <span className="sr-only">{children}</span>
    </a>
  );
}

export default OutlineFillHover;
