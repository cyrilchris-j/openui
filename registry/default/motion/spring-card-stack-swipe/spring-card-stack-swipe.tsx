"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SpringCardStackSwipeProps {
  className?: string;
}

export function SpringCardStackSwipe({ className }: SpringCardStackSwipeProps) {
  const [cards, setCards] = useState(["Architecture Draft", "System Diagram", "Deployment Plan"]);

  const popCard = () => {
    setCards((prev) => prev.slice(1));
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative h-44 w-64">
        {cards.map((title, i) => (
          <div
            key={title}
            className="absolute inset-0 flex flex-col justify-between rounded-xl border border-line bg-paper p-5 shadow-lg transition-all duration-300"
            style={{
              transform: `translateY(${i * 8}px) scale(${1 - i * 0.05})`,
              zIndex: 10 - i,
            }}
          >
            <span className="font-mono text-[10px] text-ink/50">STAGE {i + 1}</span>
            <h4 className="font-display font-bold text-ink">{title}</h4>
            <div className="font-mono text-[10px] text-ink/40">OpenUI Artifact</div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={popCard}
        disabled={cards.length === 0}
        className="rounded border border-line px-4 py-1.5 font-mono text-xs text-ink hover:bg-line/20 disabled:opacity-30"
      >
        Dismiss Top Card
      </button>
    </div>
  );
}

export default SpringCardStackSwipe;
