"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PerspectiveCubeFlipProps {
  className?: string;
}

export function PerspectiveCubeFlip({ className }: PerspectiveCubeFlipProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4", className)}>
      <div style={{ perspective: 600 }}>
        <div
          onClick={() => setFlipped((f) => !f)}
          style={{
            transform: flipped ? "rotateX(-90deg)" : "rotateX(0deg)",
            transformStyle: "preserve-3d",
          }}
          className="relative h-20 w-48 cursor-pointer rounded-xl border border-line bg-ink text-paper shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center font-mono text-sm font-bold"
        >
          {flipped ? "BACK FACE ACTIVE" : "FRONT FACE ACTIVE"}
        </div>
      </div>
      <span className="font-mono text-xs text-ink/50">Click cube to rotate 90°</span>
    </div>
  );
}

export default PerspectiveCubeFlip;
