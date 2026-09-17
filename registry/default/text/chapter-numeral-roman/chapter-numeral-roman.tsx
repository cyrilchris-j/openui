"use client";

import { cn } from "@/lib/cn";

export interface ChapterNumeralRomanProps {
  /** Chapter number, converted to roman numerals. */
  chapter: number;
  title: string;
  className?: string;
}

function roman(num: number): string {
  const table: Array<[number, string]> = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let value = num;
  let out = "";
  for (const [amount, glyph] of table) {
    while (value >= amount) {
      out += glyph;
      value -= amount;
    }
  }
  return out;
}

export function ChapterNumeralRoman({ chapter, title, className }: ChapterNumeralRomanProps) {
  const numeral = roman(chapter);

  return (
    <header className={cn("relative overflow-hidden py-14", className)}>
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display leading-none text-ink/[0.06]"
        style={{ fontSize: "clamp(8rem, 22vw, 16rem)" }}
      >
        {numeral}
      </span>
      <div className="relative z-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Chapter {chapter}</p>
        <h2 className="mt-3 font-display text-step-4 text-ink">{title}</h2>
      </div>
    </header>
  );
}

export default ChapterNumeralRoman;
