"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ConfettiBlastTriggerProps {
  className?: string;
}

export function ConfettiBlastTrigger({ className }: ConfettiBlastTriggerProps) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  const blast = () => {
    const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"];
    const next = Array.from({ length: 24 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 120 - 40,
      color: colors[i % colors.length] ?? "#ef4444",
    }));
    setParticles(next);
    setTimeout(() => setParticles([]), 800);
  };

  return (
    <div className={cn("relative flex h-48 w-full max-w-sm items-center justify-center rounded-xl border border-line bg-paper p-6", className)}>
      <button
        type="button"
        onClick={blast}
        className="relative z-10 rounded-lg bg-ink px-5 py-2.5 font-medium text-paper shadow-md active:scale-95"
      >
        Complete Goal
      </button>

      {particles.map((p) => (
        <span
          key={p.id}
          className="pointer-events-none absolute h-2 w-2 rounded-sm transition-all duration-700 ease-out"
          style={{
            backgroundColor: p.color,
            transform: `translate(${p.x}px, ${p.y}px)`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}

export default ConfettiBlastTrigger;
