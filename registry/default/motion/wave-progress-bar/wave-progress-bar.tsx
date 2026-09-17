"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface WaveProgressBarProps {
  progress?: number;
  className?: string;
}

export function WaveProgressBar({ progress = 65, className }: WaveProgressBarProps) {
  const [val, setVal] = useState(progress);

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between font-mono text-xs text-ink/60 mb-2">
        <span>BUFFER CAPACITY</span>
        <span className="font-bold text-ink">{val}%</span>
      </div>

      <div className="relative h-4 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full bg-ink transition-all duration-300 ease-out"
          style={{ width: `${val}%` }}
        />
      </div>

      <div className="mt-4 flex gap-2">
        {[25, 50, 75, 100].map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => setVal(step)}
            className="flex-1 rounded border border-line py-1 font-mono text-[10px] text-ink hover:bg-line/20"
          >
            {step}%
          </button>
        ))}
      </div>
    </div>
  );
}

export default WaveProgressBar;
