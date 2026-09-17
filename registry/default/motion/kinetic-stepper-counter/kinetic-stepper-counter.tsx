"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticStepperCounterProps {
  initial?: number;
  className?: string;
}

export function KineticStepperCounter({ initial = 42, className }: KineticStepperCounterProps) {
  const [count, setCount] = useState(initial);

  return (
    <div className={cn("inline-flex items-center gap-4 rounded-xl border border-line bg-paper p-3 shadow-sm", className)}>
      <button
        type="button"
        onClick={() => setCount((c) => Math.max(0, c - 1))}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-lg font-bold text-ink hover:bg-line/20"
      >
        -
      </button>

      <div className="h-10 w-16 overflow-hidden text-center">
        <div
          className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] font-mono text-2xl font-bold text-ink"
          style={{ transform: `translateY(-${(count % 10) * 2.5}rem)` }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-10 flex items-center justify-center">
              {i}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-lg font-bold text-ink hover:bg-line/20"
      >
        +
      </button>
    </div>
  );
}

export default KineticStepperCounter;
