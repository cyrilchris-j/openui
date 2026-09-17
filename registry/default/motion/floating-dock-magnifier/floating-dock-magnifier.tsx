"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FloatingDockMagnifierProps {
  className?: string;
}

export function FloatingDockMagnifier({ className }: FloatingDockMagnifierProps) {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const icons = ["⌘", "⌥", "⇧", "⌃", "⎋", "⏎"];

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouseX(e.clientX - rect.left);
      }}
      onPointerLeave={() => setMouseX(null)}
      className={cn("inline-flex items-end gap-3 rounded-2xl border border-line bg-paper/80 p-3 shadow-xl backdrop-blur", className)}
    >
      {icons.map((icon, idx) => {
        const iconCenter = idx * 52 + 24;
        const dist = mouseX !== null ? Math.abs(mouseX - iconCenter) : 999;
        const scale = mouseX !== null ? Math.max(1, 1.8 - dist / 80) : 1;

        return (
          <div
            key={idx}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-paper shadow-sm font-mono text-base font-bold text-ink transition-transform duration-75"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "bottom center",
            }}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
}

export default FloatingDockMagnifier;
