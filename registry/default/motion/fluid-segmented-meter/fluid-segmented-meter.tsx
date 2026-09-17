"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FluidSegmentedMeterProps {
  className?: string;
}

export function FluidSegmentedMeter({ className }: FluidSegmentedMeterProps) {
  const [level, setLevel] = useState(3);
  const total = 5;

  return (
    <div className={cn("inline-flex flex-col gap-3 rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60">
        <span>AUXILIARY POWER</span>
        <span className="font-bold text-ink">{(level / total) * 100}%</span>
      </div>

      <div className="flex gap-1.5 bg-line/20 p-1.5 rounded-lg">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-8 w-8 rounded transition-all duration-200",
              i < level ? "bg-ink scale-95" : "bg-line/40 scale-100"
            )}
          />
        ))}
      </div>

      <div className="flex justify-between gap-2 mt-2">
        <button
          type="button"
          onClick={() => setLevel((l) => Math.max(0, l - 1))}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
        >
          Drain
        </button>
        <button
          type="button"
          onClick={() => setLevel((l) => Math.min(total, l + 1))}
          className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
        >
          Charge
        </button>
      </div>
    </div>
  );
}

export default FluidSegmentedMeter;
