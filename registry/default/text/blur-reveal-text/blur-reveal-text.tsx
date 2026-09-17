"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface BlurRevealTextProps {
  text: string;
  /** Seconds between word starts. */
  stagger?: number;
  className?: string;
}

export function BlurRevealText({ text, stagger = 0.12, className }: BlurRevealTextProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const words = text.split(" ");
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const revealed = inView || Boolean(reduced);

  return (
    <span ref={ref} className={cn("inline", className)} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden
          className="inline-block will-change-[filter,opacity]"
          style={{
            filter: revealed ? "blur(0)" : "blur(8px)",
            opacity: revealed ? 1 : 0,
            transition: revealed
              ? `filter 520ms ease ${index * stagger}s, opacity 520ms ease ${index * stagger}s`
              : "none",
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

export default BlurRevealText;
