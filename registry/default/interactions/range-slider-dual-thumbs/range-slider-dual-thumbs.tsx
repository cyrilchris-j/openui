"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RangeSliderDualThumbsProps {
  className?: string;
}

export function RangeSliderDualThumbs({ className }: RangeSliderDualThumbsProps) {
  const [minVal, setMinVal] = useState(25);
  const [maxVal, setMaxVal] = useState(75);

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-4">
        <span>WINDOW BOUNDS</span>
        <span className="font-bold text-ink">[{minVal} - {maxVal}]</span>
      </div>

      <div className="space-y-3">
        <div>
          <span className="font-mono text-[10px] text-ink/40">MIN BOUND</span>
          <input
            type="range"
            min="0"
            max={maxVal - 5}
            value={minVal}
            onChange={(e) => setMinVal(parseInt(e.target.value, 10))}
            className="w-full cursor-pointer accent-ink"
          />
        </div>
        <div>
          <span className="font-mono text-[10px] text-ink/40">MAX BOUND</span>
          <input
            type="range"
            min={minVal + 5}
            max="100"
            value={maxVal}
            onChange={(e) => setMaxVal(parseInt(e.target.value, 10))}
            className="w-full cursor-pointer accent-ink"
          />
        </div>
      </div>
    </div>
  );
}

export default RangeSliderDualThumbs;
