"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TiltParallaxButtonProps {
  label?: string;
  className?: string;
}

export function TiltParallaxButton({ label = "Initialize Engine", className }: TiltParallaxButtonProps) {
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRot({ x: x * 20, y: -y * 20 });
  };

  return (
    <div style={{ perspective: 400 }} className="inline-block">
      <button
        type="button"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setRot({ x: 0, y: 0 })}
        style={{
          transform: `rotateX(${rot.y}deg) rotateY(${rot.x}deg)`,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-paper shadow-xl transition-transform duration-75 active:scale-95",
          className
        )}
      >
        {label}
      </button>
    </div>
  );
}

export default TiltParallaxButton;
