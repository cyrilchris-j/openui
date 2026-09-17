"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SliderNumericInputProps {
  className?: string;
}

export function SliderNumericInput({ className }: SliderNumericInputProps) {
  const [val, setVal] = useState(48);

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-5 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-ink/60">MEMORY LIMIT</span>
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(parseInt(e.target.value, 10) || 0)}
            className="w-12 rounded border border-line p-1 text-center font-bold text-ink"
          />
          <span>MB</span>
        </div>
      </div>

      <input
        type="range"
        min="16"
        max="128"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-full cursor-pointer accent-ink"
      />
    </div>
  );
}

export default SliderNumericInput;
