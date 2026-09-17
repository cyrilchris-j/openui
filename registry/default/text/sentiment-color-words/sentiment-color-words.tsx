"use client";

import { cn } from "@/lib/cn";

export interface SentimentColorWordsProps {
  /** Words with valence from -1 (negative) to 1 (positive). */
  words: Array<{ word: string; score: number }>;
  className?: string;
}

function tint(score: number): string {
  // Diverging: negative -> #4a6fa5, zero -> neutral, positive -> #e2624a
  const clamped = Math.max(-1, Math.min(1, score));
  if (clamped < 0) {
    return `color-mix(in oklab, #4a6fa5 ${Math.round(Math.abs(clamped) * 100)}%, #6b6b6b)`;
  }
  return `color-mix(in oklab, #e2624a ${Math.round(clamped * 100)}%, #6b6b6b)`;
}

export function SentimentColorWords({ words, className }: SentimentColorWordsProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="max-w-prose text-lg leading-relaxed">
        {words.map((entry, index) => (
          <span
            key={index}
            title={`${entry.word}: ${entry.score > 0 ? "+" : ""}${entry.score.toFixed(2)}`}
            className="font-medium"
            style={{ color: tint(entry.score) }}
          >
            {entry.word}{" "}
          </span>
        ))}
      </p>
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink/60" aria-hidden>
        <span>-1</span>
        <span
          className="h-1.5 w-40 rounded-full"
          style={{ background: "linear-gradient(to right, #4a6fa5, #6b6b6b, #e2624a)" }}
        />
        <span>+1</span>
      </div>
    </div>
  );
}

export default SentimentColorWords;
