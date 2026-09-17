"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverGlareCardProps {
  className?: string;
}

export function HoverGlareCard({ className }: HoverGlareCardProps) {
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlare({ x, y, opacity: 0.25 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setGlare((g) => ({ ...g, opacity: 0 }))}
      className={cn(
        "relative h-64 w-80 overflow-hidden rounded-2xl border border-line bg-ink text-paper p-6 shadow-xl select-none",
        className
      )}
    >
      {/* Glare Sheen Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.8), transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <span className="font-mono text-[10px] text-paper/60 uppercase">SPECIMEN FOIL</span>
        <h3 className="font-display text-xl font-bold">Holographic Glare</h3>
        <p className="font-mono text-[10px] text-paper/40">Tilt pointer across surface</p>
      </div>
    </div>
  );
}

export default HoverGlareCard;
