"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface WaveTextRevealProps {
  text?: string;
  className?: string;
}

export function WaveTextReveal({ text = "OPENUI REGISTRY", className }: WaveTextRevealProps) {
  const [active, setActive] = useState(true);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-8", className)}>
      <div className="flex overflow-hidden">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className={cn(
              "inline-block font-display text-2xl font-black text-ink transition-transform duration-500",
              active ? "translate-y-0" : "translate-y-8 opacity-0"
            )}
            style={{ transitionDelay: `${i * 35}ms` }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          setActive(false);
          setTimeout(() => setActive(true), 150);
        }}
        className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
      >
        Re-wave
      </button>
    </div>
  );
}

export default WaveTextReveal;
