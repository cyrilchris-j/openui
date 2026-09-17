"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollCurtainRevealProps {
  progress?: number;
  className?: string;
}

export function ScrollCurtainReveal({ progress: controlledProgress, className }: ScrollCurtainRevealProps) {
  const [internalProgress, setInternalProgress] = useState(0.3);
  const progress = controlledProgress ?? internalProgress;

  return (
    <div className={cn("relative h-80 w-full overflow-hidden rounded-xl border border-line bg-paper", className)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-ink/60">Unveiled Surface</span>
        <h3 className="mt-2 font-display text-2xl font-bold text-ink">Hidden Architecture</h3>
        <p className="mt-1 max-w-sm text-sm text-ink/70">The curtain parts smoothly as progress advances from edge to edge.</p>
      </div>

      {/* Left Leaf */}
      <div
        className="absolute inset-y-0 left-0 bg-ink transition-transform duration-100 ease-out"
        style={{
          width: "50%",
          transform: `translateX(${-progress * 100}%)`,
        }}
      >
        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-paper/40">LEFT LEAF</div>
      </div>

      {/* Right Leaf */}
      <div
        className="absolute inset-y-0 right-0 bg-ink transition-transform duration-100 ease-out"
        style={{
          width: "50%",
          transform: `translateX(${progress * 100}%)`,
        }}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-paper/40">RIGHT LEAF</div>
      </div>

      {/* Manual scrubber overlay if uncontrolled */}
      {controlledProgress === undefined && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-line/40 bg-paper/90 px-4 py-1.5 shadow-sm backdrop-blur">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={internalProgress}
            onChange={(e) => setInternalProgress(parseFloat(e.target.value))}
            className="h-1.5 w-32 cursor-pointer accent-ink"
          />
        </div>
      )}
    </div>
  );
}

export default ScrollCurtainReveal;
