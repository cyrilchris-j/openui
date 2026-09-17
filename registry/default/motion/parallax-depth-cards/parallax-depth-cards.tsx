"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ParallaxDepthCardsProps {
  className?: string;
}

export function ParallaxDepthCards({ className }: ParallaxDepthCardsProps) {
  const [offsetY, setOffsetY] = useState(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffsetY(y * 40);
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setOffsetY(0)}
      className={cn("relative h-80 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Back card */}
        <div
          className="absolute h-36 w-64 rounded-xl border border-line bg-ink/5 shadow-sm transition-transform duration-200"
          style={{ transform: `translateY(${offsetY * 0.4}px) scale(0.9)` }}
        />
        {/* Middle card */}
        <div
          className="absolute h-36 w-64 rounded-xl border border-line bg-paper shadow-md transition-transform duration-200"
          style={{ transform: `translateY(${offsetY * 0.8}px) scale(0.95)` }}
        />
        {/* Front card */}
        <div
          className="absolute h-36 w-64 rounded-xl border border-line bg-paper p-4 shadow-xl transition-transform duration-200"
          style={{ transform: `translateY(${offsetY * 1.3}px)` }}
        >
          <span className="font-mono text-[10px] text-ink/50">PARALLAX FOREGROUND</span>
          <h4 className="mt-1 font-display font-bold text-ink">Differential Velocity</h4>
        </div>
      </div>
    </div>
  );
}

export default ParallaxDepthCards;
