"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticCursorFollowerProps {
  className?: string;
}

export function MagneticCursorFollower({ className }: MagneticCursorFollowerProps) {
  const [pos, setPos] = useState({ x: 100, y: 100 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper p-6 cursor-none", className)}
    >
      <div
        className="pointer-events-none absolute -ml-3 -mt-3 h-6 w-6 rounded-full bg-ink transition-transform duration-100 ease-out"
        style={{ left: pos.x, top: pos.y }}
      />
      <div className="flex h-full items-center justify-center text-center font-mono text-xs text-ink/50">
        Gliding Velocity Node
      </div>
    </div>
  );
}

export default MagneticCursorFollower;
