"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PinchZoomCardProps {
  className?: string;
}

export function PinchZoomCard({ className }: PinchZoomCardProps) {
  const [zoom, setZoom] = useState(1);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex justify-between w-full font-mono text-xs text-ink/60">
        <span>ZOOM: {Math.round(zoom * 100)}%</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
            className="rounded border px-2 py-0.5"
          >
            -
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(1.5, z + 0.25))}
            className="rounded border px-2 py-0.5"
          >
            +
          </button>
        </div>
      </div>

      <div
        className="rounded-xl border border-line bg-ink text-paper p-6 transition-transform duration-200"
        style={{ transform: `scale(${zoom})` }}
      >
        <span className="font-mono text-[9px] uppercase opacity-60">SCALED CARD</span>
        <h4 className="font-display text-base font-bold">Vector Entity</h4>
      </div>
    </div>
  );
}

export default PinchZoomCard;
