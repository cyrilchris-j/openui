"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface BaselineSlideLinesProps {
  /** One array entry per authored line. */
  lines: string[];
  /** Seconds between line starts. */
  stagger?: number;
  className?: string;
}

export function BaselineSlideLines({ lines, stagger = 0.14, className }: BaselineSlideLinesProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const revealed = inView || Boolean(reduced);

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, index) => (
        <span
          key={index}
          className="block overflow-hidden"
          aria-hidden
        >
          <span
            className="block will-change-transform"
            style={{
              transform: revealed ? "translateY(0)" : "translateY(110%)",
              transition: revealed
                ? `transform 640ms cubic-bezier(0.2, 0, 0, 1) ${index * stagger}s`
                : "none",
            }}
          >
            {line}
          </span>
        </span>
      ))}
      <span className="sr-only">{lines.join(" ")}</span>
    </span>
  );
}

export default BaselineSlideLines;
