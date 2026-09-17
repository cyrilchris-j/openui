"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ToggleSwitchMorphProps {
  className?: string;
}

export function ToggleSwitchMorph({ className }: ToggleSwitchMorphProps) {
  const [on, setOn] = useState(false);

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">LIVE TRACING</span>
      <div
        onClick={() => setOn((o) => !o)}
        className={cn(
          "relative h-8 w-16 cursor-pointer rounded-full border border-line p-1 transition-colors duration-200",
          on ? "bg-ink border-ink" : "bg-line/20"
        )}
      >
        <div
          className={cn(
            "h-6 rounded-full bg-paper shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            on ? "w-6 translate-x-8" : "w-6 translate-x-0"
          )}
        />
      </div>
    </div>
  );
}

export default ToggleSwitchMorph;
