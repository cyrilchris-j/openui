"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface NumericSpinnerInputProps {
  className?: string;
}

export function NumericSpinnerInput({ className }: NumericSpinnerInputProps) {
  const [val, setVal] = useState(10);

  return (
    <div className={cn("inline-flex items-center rounded-lg border border-line bg-paper p-1 shadow-sm font-mono text-xs", className)}>
      <span className="px-3 font-bold text-ink">{val}</span>
      <div className="flex flex-col border-l border-line pl-1">
        <button type="button" onClick={() => setVal((v) => v + 1)} className="px-1 hover:bg-line/20">
          ▲
        </button>
        <button type="button" onClick={() => setVal((v) => Math.max(0, v - 1))} className="px-1 hover:bg-line/20">
          ▼
        </button>
      </div>
    </div>
  );
}

export default NumericSpinnerInput;
