"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticSliderFillProps {
  className?: string;
}

export function ElasticSliderFill({ className }: ElasticSliderFillProps) {
  const [level, setLevel] = useState(65);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">TANK FILL: {level}%</span>

      <div className="relative h-44 w-14 overflow-hidden rounded-lg border border-line bg-line/20 flex items-end">
        <div
          className="w-full bg-ink transition-all duration-150 ease-out"
          style={{ height: `${level}%` }}
        />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={level}
        onChange={(e) => setLevel(parseInt(e.target.value, 10))}
        className="w-32 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default ElasticSliderFill;
