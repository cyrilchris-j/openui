"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function MultiRangeHistogram({ className }: { className?: string }) {
  const buckets = [12, 28, 45, 60, 92, 110, 85, 64, 40, 32, 18, 9];
  const [minVal, setMinVal] = useState(2);
  const [maxVal, setMaxVal] = useState(9);

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-sm w-full font-mono text-xs shadow-sm", className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-ink/60 font-semibold">Distribution Window</span>
        <span className="text-accent font-bold">[{minVal * 10}ms – {maxVal * 10}ms]</span>
      </div>

      <div className="flex items-end gap-1.5 h-24 mb-3 px-1">
        {buckets.map((count, i) => {
          const inRange = i >= minVal && i <= maxVal;
          const heightPct = (count / 110) * 100;
          return (
            <div
              key={i}
              onClick={() => {
                if (i < minVal) setMinVal(i);
                else setMaxVal(i);
              }}
              className={cn(
                "flex-1 rounded-t transition-all cursor-pointer",
                inRange ? "bg-accent" : "bg-line hover:bg-line/70"
              )}
              style={{ height: `${heightPct}%` }}
            />
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="range"
          min="0"
          max="11"
          value={minVal}
          onChange={(e) => setMinVal(Math.min(Number(e.target.value), maxVal))}
          className="flex-1 accent-accent"
        />
        <input
          type="range"
          min="0"
          max="11"
          value={maxVal}
          onChange={(e) => setMaxVal(Math.max(Number(e.target.value), minVal))}
          className="flex-1 accent-accent"
        />
      </div>
    </div>
  );
}
