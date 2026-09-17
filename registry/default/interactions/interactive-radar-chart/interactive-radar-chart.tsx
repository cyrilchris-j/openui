"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveRadarChartProps {
  className?: string;
}

export function InteractiveRadarChart({ className }: InteractiveRadarChartProps) {
  const [val, setVal] = useState(80);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">RADAR METRIC BIAS: {val}%</span>

      <div className="relative flex h-32 w-32 items-center justify-center border border-line rounded-full bg-line/10">
        <div
          className="h-24 w-24 border border-ink/40 rotate-45 transition-transform duration-150"
          style={{ transform: `scale(${val / 100}) rotate(45deg)` }}
        />
      </div>

      <input
        type="range"
        min="20"
        max="100"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-32 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default InteractiveRadarChart;
