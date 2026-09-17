"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface VerseLineNumbersProps {
  /** One entry per authored verse line. */
  lines: string[];
  /** Show a number every N lines. */
  every?: number;
  className?: string;
}

export function VerseLineNumbers({ lines, every = 5, className }: VerseLineNumbersProps) {
  const [active, setActive] = useState(0);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const measure = () => {
      const centre = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      lineRefs.current.forEach((node, index) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - centre);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      setActive(best);
    };
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    return () => window.removeEventListener("scroll", measure);
  }, [lines.length]);

  return (
    <div className={cn("grid grid-cols-[2.5rem_1fr] gap-x-3", className)}>
      {lines.map((line, index) => (
        <FragmentLine
          key={index}
          index={index}
          number={index % every === 0 || index === lines.length - 1 ? String(index + 1) : ""}
          active={index === active}
          ref={(node) => {
            lineRefs.current[index] = node;
          }}
          text={line}
        />
      ))}
    </div>
  );
}

import { forwardRef } from "react";

const FragmentLine = forwardRef<
  HTMLSpanElement,
  { index: number; number: string; active: boolean; text: string }
>(function FragmentLine({ index, number, active, text }, ref) {
  return (
    <>
      <span
        ref={ref}
        aria-hidden
        className="select-none text-right font-mono text-xs transition-colors duration-300"
        style={{
          gridRow: index + 1,
          gridColumn: 1,
          color: active ? "#e2624a" : "color-mix(in oklab, currentColor, transparent 75%)",
        }}
      >
        {number}
      </span>
      <span className="font-display text-lg leading-relaxed text-ink" style={{ gridRow: index + 1, gridColumn: 2 }}>
        {text || "\u00A0"}
      </span>
    </>
  );
});
