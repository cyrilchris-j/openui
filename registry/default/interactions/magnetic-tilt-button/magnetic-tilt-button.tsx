"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MagneticTiltButtonProps {
  label?: string;
  className?: string;
}

export function MagneticTiltButton({ label = "Deploy Endpoint", className }: MagneticTiltButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    setOffset({ x, y });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      type="button"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      className={cn(
        "rounded-full bg-ink px-6 py-3 font-display text-sm font-bold text-paper shadow-lg transition-transform duration-100 ease-out active:scale-95",
        className
      )}
    >
      {label}
    </button>
  );
}

export default MagneticTiltButton;
