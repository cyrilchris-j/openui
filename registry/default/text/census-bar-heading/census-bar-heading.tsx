"use client";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface CensusBarHeadingProps {
  /** Words with the value each bar encodes. */
  words: Array<{ word: string; value: number }>;
  /** Colour of the bars. */
  bar?: string;
  className?: string;
}

export function CensusBarHeading({ words, bar = "#e2624a", className }: CensusBarHeadingProps) {
  const { ref, inView } = useInView<HTMLHeadingElement>({ once: true });
  const max = Math.max(...words.map((entry) => entry.value), 1);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const grown = inView || Boolean(reduced);

  return (
    <h2 ref={ref} className={cn("flex flex-wrap items-end gap-x-4 gap-y-3", className)} aria-label={words.map((entry) => entry.word).join(" ")}>
      {words.map((entry, index) => (
        <span key={index} aria-hidden className="group inline-flex flex-col">
          <span className="font-display leading-none">{entry.word}</span>
          <span className="mt-1.5 h-1.5 w-full bg-line/40">
            <span
              className="block h-full"
              title={String(entry.value)}
              style={{
                width: grown ? `${(entry.value / max) * 100}%` : "0%",
                background: bar,
                transition: `width 700ms cubic-bezier(0.2, 0, 0, 1) ${index * 90}ms`,
              }}
            />
          </span>
          <span className="sr-only">{entry.value}</span>
        </span>
      ))}
    </h2>
  );
}

export default CensusBarHeading;
