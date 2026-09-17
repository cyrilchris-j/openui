"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticSliderRailProps {
  className?: string;
}

export function KineticSliderRail({ className }: KineticSliderRailProps) {
  const [val, setVal] = useState(50);

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-4">
        <span>GAIN ADJUST</span>
        <span className="font-bold text-ink">{val}%</span>
      </div>

      <div className="relative flex items-center">
        <input
          type="range"
          min="0"
          max="100"
          value={val}
          onChange={(e) => setVal(parseInt(e.target.value, 10))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-line accent-ink"
        />
      </div>

      <div className="flex justify-between font-mono text-[9px] text-ink/40 mt-2">
        <span>0dB</span>
        <span>+6dB</span>
        <span>+12dB</span>
      </div>
    </div>
  );
}

export default KineticSliderRail;
