"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedFilterBarProps {
  options?: string[];
  className?: string;
}

export function SegmentedFilterBar({
  options = ["All", "Active", "Archived"],
  className,
}: SegmentedFilterBarProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={cn("inline-flex rounded-full border border-line bg-line/20 p-1 font-mono text-xs", className)}>
      {options.map((opt, i) => (
        <button
          key={opt}
          type="button"
          onClick={() => setSelected(i)}
          className={cn(
            "rounded-full px-3.5 py-1 transition-all font-semibold",
            selected === i ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default SegmentedFilterBar;
