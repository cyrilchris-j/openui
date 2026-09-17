"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverGlitchDisplacementProps {
  className?: string;
}

export function HoverGlitchDisplacement({ className }: HoverGlitchDisplacementProps) {
  const [glitching, setGlitching] = useState(false);

  return (
    <div
      onPointerEnter={() => setGlitching(true)}
      onPointerLeave={() => setGlitching(false)}
      className={cn(
        "relative flex h-64 w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-line bg-ink p-6 select-none",
        className
      )}
    >
      <div className="relative z-10 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-paper/50">CYPHER TERMINAL</span>
        <h4
          className={cn(
            "mt-2 font-mono text-2xl font-black text-paper transition-all",
            glitching && "translate-x-1 text-red-500 shadow-sm"
          )}
        >
          {glitching ? "FAULT_DETECTED" : "SYSTEM_SECURE"}
        </h4>
        <p className="mt-2 font-mono text-[10px] text-paper/60">HOVER TO INTRODUCE JITTER</p>
      </div>
    </div>
  );
}

export default HoverGlitchDisplacement;
