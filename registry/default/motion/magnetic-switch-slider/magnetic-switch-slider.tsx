"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticSwitchSliderProps {
  className?: string;
}

export function MagneticSwitchSlider({ className }: MagneticSwitchSliderProps) {
  const [on, setOn] = useState(false);

  return (
    <div className={cn("inline-flex items-center gap-4 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">MAIN RELAY</span>
      <div
        onClick={() => setOn((prev) => !prev)}
        className={cn(
          "relative h-8 w-16 cursor-pointer rounded border border-line bg-line/20 p-1 transition-colors duration-200",
          on ? "bg-ink border-ink" : "bg-line/20"
        )}
      >
        <div
          className={cn(
            "h-6 w-6 rounded bg-paper shadow-md transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            on ? "translate-x-8" : "translate-x-0"
          )}
        />
      </div>
      <span className="font-mono text-xs font-bold text-ink">{on ? "ENGAGED" : "ISOLATED"}</span>
    </div>
  );
}

export default MagneticSwitchSlider;
