"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticButtonClusterProps {
  className?: string;
}

export function MagneticButtonCluster({ className }: MagneticButtonClusterProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.15;
    setOffset({ x, y });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={cn("flex items-center justify-center gap-3 p-10 rounded-xl border border-line bg-paper", className)}
    >
      {["Documentation", "GitHub", "Components"].map((label, idx) => (
        <button
          key={label}
          type="button"
          style={{
            transform: `translate(${offset.x * (idx + 1) * 0.6}px, ${offset.y * (idx + 1) * 0.6}px)`,
          }}
          className="rounded-full border border-line bg-paper px-4 py-2 text-xs font-semibold text-ink shadow-sm transition-transform duration-100 ease-out hover:bg-line/20"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default MagneticButtonCluster;
