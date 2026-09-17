"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ReboundCheckboxProps {
  label?: string;
  className?: string;
}

export function ReboundCheckbox({ label = "Require cryptographic signature", className }: ReboundCheckboxProps) {
  const [checked, setChecked] = useState(false);

  return (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer select-none", className)}>
      <div
        onClick={() => setChecked((c) => !c)}
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded border transition-all duration-200",
          checked ? "border-ink bg-ink scale-95" : "border-line bg-paper hover:border-ink"
        )}
      >
        {checked && (
          <svg className="h-4 w-4 text-paper" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="font-mono text-xs text-ink">{label}</span>
    </label>
  );
}

export default ReboundCheckbox;
