"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface LiquidCardExpandProps {
  className?: string;
}

export function LiquidCardExpand({ className }: LiquidCardExpandProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn("relative h-80 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}>
      <div
        onClick={() => setExpanded((e) => !e)}
        className={cn(
          "cursor-pointer rounded-xl border border-line bg-paper p-6 shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          expanded ? "absolute inset-4 z-20 shadow-2xl" : "relative h-44 w-full"
        )}
      >
        <div className="flex justify-between items-start">
          <span className="font-mono text-xs text-ink/50">OPENUI SPEC</span>
          <span className="text-xs font-mono text-ink/70">{expanded ? "Tap to collapse" : "Tap to expand"}</span>
        </div>
        <h4 className="mt-2 font-display text-lg font-bold text-ink">Design Tokens Core</h4>
        <p className="mt-2 text-xs leading-relaxed text-ink/70">
          Shared element transitions create continuous spatial continuity across layout transformations.
        </p>
      </div>
    </div>
  );
}

export default LiquidCardExpand;
