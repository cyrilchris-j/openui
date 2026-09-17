"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticCursorHaloProps {
  className?: string;
}

export function MagneticCursorHalo({ className }: MagneticCursorHaloProps) {
  const [pos, setPos] = useState({ x: 120, y: 80 });
  const [hovered, setHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-8 cursor-crosshair", className)}
    >
      <div
        className="pointer-events-none absolute -ml-5 -mt-5 rounded-full border border-ink/40 transition-all duration-150 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: hovered ? 48 : 24,
          height: hovered ? 48 : 24,
          transform: hovered ? "translate(-12px, -12px)" : "none",
        }}
      />
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        <p className="font-mono text-xs text-ink/60">Hover the button to expand the reticle</p>
        <button
          type="button"
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          className="rounded-lg bg-ink px-5 py-2.5 font-medium text-paper"
        >
          Magnetic Target
        </button>
      </div>
    </div>
  );
}

export default MagneticCursorHalo;
