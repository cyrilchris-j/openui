"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SteppedNumberScrubberProps {
  initial?: number;
  className?: string;
}

export function SteppedNumberScrubber({ initial = 120, className }: SteppedNumberScrubberProps) {
  const [val, setVal] = useState(initial);

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">KERNEL TIMEOUT:</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setVal((v) => Math.max(0, v - 10))}
          className="h-6 w-6 rounded border border-line font-mono text-xs text-ink hover:bg-line/20"
        >
          -
        </button>
        <span className="font-mono text-sm font-bold text-ink w-14 text-center">{val}ms</span>
        <button
          type="button"
          onClick={() => setVal((v) => v + 10)}
          className="h-6 w-6 rounded border border-line font-mono text-xs text-ink hover:bg-line/20"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default SteppedNumberScrubber;
