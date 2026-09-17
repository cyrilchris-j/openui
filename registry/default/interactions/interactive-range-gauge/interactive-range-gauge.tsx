"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveRangeGaugeProps {
  className?: string;
}

export function InteractiveRangeGauge({ className }: InteractiveRangeGaugeProps) {
  const [val, setVal] = useState(64);
  const angle = (val / 100) * 180 - 90;

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">CAPACITY GAUGE: {val}%</span>

      <div className="relative flex h-28 w-48 items-end justify-center overflow-hidden border-b-2 border-line">
        <div
          className="h-20 w-1 bg-ink rounded-full origin-bottom transition-transform duration-100 ease-out"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <div className="absolute bottom-0 h-4 w-4 rounded-full bg-ink" />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-40 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default InteractiveRangeGauge;
