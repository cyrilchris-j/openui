"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function GaugeSpeedometer({ className }: { className?: string }) {
  const [val, setVal] = useState(68);

  const angle = (val / 100) * 180 - 90;

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full flex flex-col items-center font-mono shadow-sm", className)}>
      <div className="text-xs text-ink/60 mb-2 font-semibold">Engine Throughput</div>
      <div className="relative w-40 h-24 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 100 55" className="w-full h-full">
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="8" className="text-line" strokeLinecap="round" />
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-accent"
            strokeLinecap="round"
            strokeDasharray="126"
            strokeDashoffset={126 - (val / 100) * 126}
          />
        </svg>
        <div
          className="absolute bottom-1 w-0.5 h-14 bg-ink origin-bottom transition-transform duration-200"
          style={{ transform: `rotate(${angle}deg)` }}
        />
        <div className="absolute bottom-0 w-3 h-3 rounded-full bg-ink" />
      </div>

      <div className="text-xl font-bold text-ink mt-2">{val}%</div>
      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        className="w-full mt-3 accent-accent cursor-pointer"
      />
    </div>
  );
}
