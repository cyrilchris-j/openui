"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface SoundwaveVisualizerBarProps {
  barCount?: number;
  className?: string;
}

export function SoundwaveVisualizerBar({ barCount = 12, className }: SoundwaveVisualizerBarProps) {
  const [heights, setHeights] = useState<number[]>(Array(barCount).fill(20));

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(Array.from({ length: barCount }, () => Math.random() * 80 + 15));
    }, 120);
    return () => clearInterval(interval);
  }, [barCount]);

  return (
    <div className={cn("flex h-24 items-center justify-center gap-1.5 rounded-xl border border-line bg-paper p-4", className)}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-2 rounded-full bg-ink transition-all duration-100 ease-out"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export default SoundwaveVisualizerBar;
