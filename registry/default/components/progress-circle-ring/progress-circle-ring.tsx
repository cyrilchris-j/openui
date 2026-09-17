"use client";

import { cn } from "@/lib/cn";

export interface ProgressCircleRingProps {
  percent?: number;
  className?: string;
}

export function ProgressCircleRing({ percent = 82, className }: ProgressCircleRingProps) {
  const radius = 40;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;

  return (
    <div className={cn("relative flex h-28 w-28 items-center justify-center", className)}>
      <svg className="h-full w-full rotate-[-90deg]">
        <circle cx="56" cy="56" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-line" />
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-ink"
        />
      </svg>
      <span className="absolute font-mono text-sm font-bold text-ink">{percent}%</span>
    </div>
  );
}

export default ProgressCircleRing;
