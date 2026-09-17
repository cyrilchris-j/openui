"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardStepperNumericProps {
  initial?: number;
  className?: string;
}

export function KeyboardStepperNumeric({ initial = 60, className }: KeyboardStepperNumericProps) {
  const [val, setVal] = useState(initial);

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">FPS TARGET:</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setVal((v) => Math.max(1, v - 1))}
          className="h-7 w-7 rounded border border-line font-mono text-xs hover:bg-line/20"
        >
          -
        </button>
        <span className="font-mono text-base font-bold text-ink w-12 text-center">{val}</span>
        <button
          type="button"
          onClick={() => setVal((v) => v + 1)}
          className="h-7 w-7 rounded border border-line font-mono text-xs hover:bg-line/20"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default KeyboardStepperNumeric;
