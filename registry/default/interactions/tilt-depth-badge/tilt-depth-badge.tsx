"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TiltDepthBadgeProps {
  label?: string;
  className?: string;
}

export function TiltDepthBadge({ label = "VERIFIED SYSTEM_V1", className }: TiltDepthBadgeProps) {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: x * 24, y: -y * 24 });
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setRot({ x: 0, y: 0 })}
      style={{ perspective: 400 }}
      className={cn("inline-block cursor-pointer select-none", className)}
    >
      <div
        style={{
          transform: `rotateX(${rot.y}deg) rotateY(${rot.x}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="rounded-full border border-line bg-ink px-5 py-2 font-mono text-xs font-bold text-paper shadow-md transition-transform duration-75"
      >
        ✦ {label}
      </div>
    </div>
  );
}

export default TiltDepthBadge;
