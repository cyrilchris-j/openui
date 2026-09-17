"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticAnchorTooltipProps {
  className?: string;
}

export function MagneticAnchorTooltip({ className }: MagneticAnchorTooltipProps) {
  const [lean, setLean] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.2;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.2;
    setLean({ x, y });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setLean({ x: 0, y: 0 })}
      className={cn("flex h-64 w-full max-w-sm flex-col items-center justify-center rounded-xl border border-line bg-paper p-6", className)}
    >
      <div
        className="mb-4 rounded-lg bg-ink px-3 py-1.5 font-mono text-xs text-paper shadow-md transition-transform duration-100 ease-out"
        style={{ transform: `translate(${lean.x}px, ${lean.y}px)` }}
      >
        Tethered Tooltip
      </div>
      <button
        type="button"
        className="rounded-full border border-line bg-paper px-4 py-2 font-mono text-xs text-ink shadow-sm"
      >
        Target Anchor
      </button>
    </div>
  );
}

export default MagneticAnchorTooltip;
