"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedPillToggleProps {
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}

export function SegmentedPillToggle({
  leftLabel = "Light",
  rightLabel = "Dark",
  className,
}: SegmentedPillToggleProps) {
  const [selected, setSelected] = useState<"left" | "right">("left");

  return (
    <div className={cn("inline-flex rounded-full border border-line bg-line/20 p-1", className)}>
      <button
        type="button"
        onClick={() => setSelected("left")}
        className={cn(
          "rounded-full px-4 py-1.5 font-mono text-xs font-bold transition-all",
          selected === "left" ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
        )}
      >
        {leftLabel}
      </button>
      <button
        type="button"
        onClick={() => setSelected("right")}
        className={cn(
          "rounded-full px-4 py-1.5 font-mono text-xs font-bold transition-all",
          selected === "right" ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
        )}
      >
        {rightLabel}
      </button>
    </div>
  );
}

export default SegmentedPillToggle;
