"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface WaveHandoffProps {
  rows: string[][];
  className?: string;
}

export function WaveHandoff({ rows, className }: WaveHandoffProps) {
  const [revealed, setRevealed] = useState(0);
  const total = rows.reduce((sum, row) => sum + row.length, 0);
  const timers = useRef<number[]>([]);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) {
      setRevealed(total);
      return;
    }
    let delay = 0;
    rows.forEach((row, rowIndex) => {
      row.forEach((_, itemIndex) => {
        // Each row's items accelerate (handoff builds momentum), then the
        // next row inherits a faster cadence.
        const rowCadence = Math.max(90, 260 - rowIndex * 60);
        delay += itemIndex === 0 ? 0 : rowCadence;
        timers.current.push(window.setTimeout(() => setRevealed((value) => value + 1), delay));
      });
      delay += 120; // handoff pause between rows
    });
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  let runningIndex = 0;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap gap-2">
          {row.map((item) => {
            const mine = runningIndex++;
            const visible = mine < revealed;
            const fromLeft = rowIndex % 2 === 0;
            return (
              <span
                key={`${rowIndex}-${mine}`}
                aria-hidden={!visible}
                className="rounded-lg border border-line bg-paper px-4 py-2 text-ink"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "translateX(0)"
                    : `translateX(${fromLeft ? -24 : 24}px)`,
                  transition: "opacity 240ms ease, transform 380ms cubic-bezier(0.2, 0, 0, 1)",
                }}
              >
                {item}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default WaveHandoff;
