"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ClickSparkleTrailProps {
  className?: string;
}

export function ClickSparkleTrail({ className }: ClickSparkleTrailProps) {
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newSpark = { id: Date.now(), x, y };
    setSparks((prev) => [...prev.slice(-10), newSpark]);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative h-64 w-full max-w-sm cursor-pointer overflow-hidden rounded-xl border border-line bg-paper p-6 select-none",
        className
      )}
    >
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="font-mono text-xs text-ink/50">CLICK ANYWHERE</span>
        <h4 className="font-display text-base font-bold text-ink">Twinkle Sparkle Feedback</h4>
      </div>

      {sparks.map((s) => (
        <span
          key={s.id}
          className="pointer-events-none absolute -ml-3 -mt-3 text-lg animate-ping text-amber-500"
          style={{ left: s.x, top: s.y }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

export default ClickSparkleTrail;
