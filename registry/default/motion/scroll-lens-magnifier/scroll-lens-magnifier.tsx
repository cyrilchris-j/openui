"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollLensMagnifierProps {
  className?: string;
}

export function ScrollLensMagnifier({ className }: ScrollLensMagnifierProps) {
  const [lensPos, setLensPos] = useState({ x: 140, y: 80 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLensPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-8 select-none", className)}
    >
      <div className="space-y-3 font-serif text-sm leading-relaxed text-ink/70">
        <p>
          Typography possesses rhythm and scale. When viewed closely, structural hairlines and contrast ratios reveal the underlying grid.
        </p>
        <p>
          Move the lens over this passage to examine the fine detail of grotesque and display serif forms.
        </p>
      </div>

      <div
        className="pointer-events-none absolute -ml-12 -mt-12 h-24 w-24 rounded-full border-2 border-ink bg-paper/20 shadow-2xl backdrop-blur-[1px] transition-transform duration-75"
        style={{
          left: lensPos.x,
          top: lensPos.y,
          transform: "scale(1.2)",
        }}
      />
    </div>
  );
}

export default ScrollLensMagnifier;
