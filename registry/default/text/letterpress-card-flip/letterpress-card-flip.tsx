"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface LetterpressCardFlipProps {
  name: string;
  role: string;
  contact: string;
  className?: string;
}

export function LetterpressCardFlip({ name, role, contact, className }: LetterpressCardFlipProps) {
  const [flipped, setFlipped] = useState(false);

  const face = "absolute inset-0 flex flex-col justify-center rounded-lg p-6 [backface-visibility:hidden]";

  return (
    <button
      type="button"
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
      aria-label={`Business card for ${name}. ${flipped ? "Showing contact." : "Click to flip."}`}
      className={cn(
        "relative block h-44 w-72 cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
      style={{ perspective: 1000 }}
    >
      <span
        aria-hidden
        className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <span
          className={face}
          style={{
            background: "#f6f1e7",
            color: "#3d342a",
            boxShadow: "0 10px 24px rgba(0,0,0,0.14)",
            textShadow: "0 1px 0 rgba(255,255,255,0.9), 0 -1px 0 rgba(0,0,0,0.18)",
          }}
        >
          <span className="font-display text-2xl">{name}</span>
          <span className="mt-1 font-mono text-xs uppercase tracking-[0.22em] opacity-60">{role}</span>
          <span className="mt-6 font-mono text-[10px] uppercase tracking-widest opacity-40">click to flip</span>
        </span>
        <span
          className={face}
          style={{
            background: "#2e2a24",
            color: "#f6f1e7",
            boxShadow: "0 10px 24px rgba(0,0,0,0.24)",
            textShadow: "0 1px 0 rgba(0,0,0,0.6), 0 -1px 0 rgba(255,255,255,0.08)",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="font-mono text-sm">{contact}</span>
          <span className="mt-4 font-mono text-[10px] uppercase tracking-widest opacity-50">openui · est. 2026</span>
        </span>
      </span>
    </button>
  );
}

export default LetterpressCardFlip;
