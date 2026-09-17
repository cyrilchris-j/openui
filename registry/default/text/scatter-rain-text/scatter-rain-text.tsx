"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface ScatterRainTextProps {
  children: string;
  className?: string;
}

export function ScatterRainText({ children, className }: ScatterRainTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const landed = inView || Boolean(reduced);

  return (
    <span ref={ref} className={cn("inline-block select-none", className)} role="text" aria-label={children}>
      {[...children].map((char, index) => {
        const delay = index * 70;
        const rotation = ((index * 37) % 13) - 6;
        return (
          <span key={index} aria-hidden className="inline-block overflow-visible" style={{ verticalAlign: "top" }}>
            <span
              className="inline-block will-change-transform"
              style={{
                transform: landed
                  ? "translateY(0) rotate(0deg)"
                  : `translateY(-2.4em) rotate(${rotation}deg)`,
                opacity: landed ? 1 : 0,
                transition: `transform 560ms cubic-bezier(0.34, 1.3, 0.64, 1) ${delay}ms, opacity 240ms ease ${delay}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default ScatterRainText;
