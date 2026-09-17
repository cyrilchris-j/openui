"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RadialProgressWheelProps {
  size?: number;
  className?: string;
}

export function RadialProgressWheel({ size = 120, className }: RadialProgressWheelProps) {
  const [val, setVal] = useState(72);
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (val / 100) * circ;

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="rotate-[-90deg]" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            className="text-line"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={stroke}
            fill="transparent"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-ink transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-lg font-bold text-ink">
          {val}%
        </div>
      </div>

      <div className="flex gap-2">
        {[25, 50, 75, 100].map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => setVal(step)}
            className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
          >
            {step}%
          </button>
        ))}
      </div>
    </div>
  );
}

export default RadialProgressWheel;
