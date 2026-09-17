"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface StrokeDrawTextProps {
  children: string;
  /** Seconds for the full draw. */
  duration?: number;
  /** Font size in px; the SVG scales to the text. */
  size?: number;
  className?: string;
}

/**
 * Stroke Draw Text
 *
 * Real path conversion requires the glyph outlines, which needs the font file.
 * This implementation renders the text into an SVG `<text>` and strokes it —
 * stroke-dasharray works on text elements in every evergreen browser, so the
 * draw effect works with whatever face the consumer sets, no font tooling.
 */
export function StrokeDrawText({ children, duration = 2.4, size = 64, className }: StrokeDrawTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const drawn = inView || Boolean(reduced);

  return (
    <span ref={ref} className={cn("inline-block", className)} role="text" aria-label={children}>
      <svg
        aria-hidden
        width="100%"
        height={size * 1.3}
        viewBox={`0 0 ${children.length * size * 0.62} ${size * 1.3}`}
        style={{ overflow: "visible" }}
      >
        <text
          x="0"
          y={size}
          fontSize={size}
          fill={drawn ? "currentColor" : "transparent"}
          stroke="currentColor"
          strokeWidth={1.4}
          style={{
            strokeDasharray: 1400,
            strokeDashoffset: drawn ? 0 : 1400,
            transition: `stroke-dashoffset ${duration}s ease, fill ${duration}s ease ${duration * 0.6}s`,
            fontFamily: "inherit",
          }}
        >
          {children}
        </text>
      </svg>
    </span>
  );
}

export default StrokeDrawText;
