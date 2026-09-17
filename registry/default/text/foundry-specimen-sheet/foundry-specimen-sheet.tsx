"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FoundrySpecimenSheetProps {
  phrase: string;
  /** Font sizes rendered top to bottom, px. */
  sizes?: number[];
  className?: string;
}

export function FoundrySpecimenSheet({ phrase, sizes = [40, 28, 20, 14], className }: FoundrySpecimenSheetProps) {
  const [weight, setWeight] = useState(500);

  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <div role="table" aria-label="Type specimen at multiple sizes">
        {sizes.map((size) => (
          <div key={size} role="row" className="flex items-baseline gap-4 border-b border-line/60 py-2">
            <span aria-hidden role="cell" className="w-10 shrink-0 font-mono text-[10px] text-ink/50">
              {size}px
            </span>
            <span
              role="cell"
              className="truncate text-ink"
              style={{ fontSize: size, fontWeight: weight, letterSpacing: size > 24 ? "-0.02em" : undefined }}
            >
              {phrase}
            </span>
          </div>
        ))}
      </div>
      <label className="flex items-center gap-3 font-mono text-xs text-ink/70">
        weight
        <input
          type="range"
          min={100}
          max={900}
          step={10}
          value={weight}
          onChange={(event) => setWeight(Number(event.target.value))}
          className="w-44"
        />
        <span className="tabular-nums">{weight}</span>
      </label>
    </div>
  );
}

export default FoundrySpecimenSheet;
