"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SliderStepperControlProps {
  className?: string;
}

export function SliderStepperControl({ className }: SliderStepperControlProps) {
  const [val, setVal] = useState(50);

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between mb-3">
        <span className="text-ink/60">THRESHOLD</span>
        <span className="font-bold text-ink">{val}%</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setVal((v) => Math.max(0, v - 5))}
          className="h-7 w-7 rounded border border-line flex items-center justify-center font-bold hover:bg-line/20"
        >
          -
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={val}
          onChange={(e) => setVal(parseInt(e.target.value, 10))}
          className="flex-1 cursor-pointer accent-ink"
        />
        <button
          type="button"
          onClick={() => setVal((v) => Math.min(100, v + 5))}
          className="h-7 w-7 rounded border border-line flex items-center justify-center font-bold hover:bg-line/20"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default SliderStepperControl;
