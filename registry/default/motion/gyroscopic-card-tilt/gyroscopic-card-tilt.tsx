"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GyroscopicCardTiltProps {
  className?: string;
  name?: string;
  role?: string;
}

export function GyroscopicCardTilt({
  className,
  name = "Aria Montgomery",
  role = "Staff Systems Architect",
}: GyroscopicCardTiltProps) {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: -y * 22, y: x * 22 });
  };

  const handlePointerLeave = () => {
    setRot({ x: 0, y: 0 });
  };

  return (
    <div style={{ perspective: 1000 }} className="inline-block">
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-56 w-96 cursor-pointer overflow-hidden rounded-2xl border border-line bg-paper p-6 shadow-xl transition-transform duration-150 ease-out",
          className
        )}
      >
        <div className="flex h-full flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-ink/50">OPENUI CLEARANCE</span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-ink">{name}</h3>
            <p className="font-mono text-xs text-ink/70">{role}</p>
          </div>
          <div className="flex justify-between font-mono text-[10px] text-ink/40">
            <span>ID: 8092-B-99</span>
            <span>LEVEL 4 VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GyroscopicCardTilt;
