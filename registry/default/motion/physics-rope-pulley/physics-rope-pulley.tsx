"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PhysicsRopePulleyProps {
  className?: string;
}

export function PhysicsRopePulley({ className }: PhysicsRopePulleyProps) {
  const [leftY, setLeftY] = useState(80);
  const totalLength = 160;
  const rightY = totalLength - leftY;

  return (
    <div className={cn("relative h-80 w-full max-w-sm rounded-xl border border-line bg-paper p-6 select-none", className)}>
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
        {/* Pulley Wheel */}
        <div className="h-12 w-12 rounded-full border-2 border-ink bg-line/20 flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-ink" />
        </div>
      </div>

      {/* Ropes & Weights */}
      <div className="relative h-full flex justify-between px-12 pt-16">
        {/* Left Mass */}
        <div
          className="flex flex-col items-center transition-all duration-200"
          style={{ transform: `translateY(${leftY}px)` }}
        >
          <div className="w-[2px] bg-ink" style={{ height: leftY }} />
          <div className="h-12 w-12 rounded-lg bg-ink text-paper flex items-center justify-center font-mono text-xs font-bold shadow">
            5kg
          </div>
        </div>

        {/* Right Mass */}
        <div
          className="flex flex-col items-center transition-all duration-200"
          style={{ transform: `translateY(${rightY}px)` }}
        >
          <div className="w-[2px] bg-ink" style={{ height: rightY }} />
          <div className="h-12 w-12 rounded-lg border border-line bg-paper text-ink flex items-center justify-center font-mono text-xs font-bold shadow">
            5kg
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <input
          type="range"
          min="20"
          max="140"
          value={leftY}
          onChange={(e) => setLeftY(parseInt(e.target.value, 10))}
          className="w-32 cursor-pointer accent-ink"
        />
      </div>
    </div>
  );
}

export default PhysicsRopePulley;
