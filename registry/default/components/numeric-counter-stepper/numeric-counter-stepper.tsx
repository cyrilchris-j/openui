"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface NumericCounterStepperProps {
  initial?: number;
  className?: string;
}

export function NumericCounterStepper({ initial = 1, className }: NumericCounterStepperProps) {
  const [val, setVal] = useState(initial);

  return (
    <div className={cn("inline-flex items-center rounded-lg border border-line bg-paper overflow-hidden shadow-sm font-mono text-xs", className)}>
      <button
        type="button"
        onClick={() => setVal((v) => Math.max(0, v - 1))}
        className="h-8 w-8 hover:bg-line/20 font-bold border-r border-line flex items-center justify-center"
      >
        -
      </button>
      <span className="w-12 text-center font-bold text-ink">{val}</span>
      <button
        type="button"
        onClick={() => setVal((v) => v + 1)}
        className="h-8 w-8 hover:bg-line/20 font-bold border-l border-line flex items-center justify-center"
      >
        +
      </button>
    </div>
  );
}

export default NumericCounterStepper;
