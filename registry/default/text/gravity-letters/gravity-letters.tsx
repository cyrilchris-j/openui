"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GravityLettersProps {
  children: string;
  /** Drop distance in px. */
  fall?: number;
  className?: string;
}

export function GravityLetters({ children, fall = 160, className }: GravityLettersProps) {
  const [dropped, setDropped] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const active = dropped && !reduced;

  return (
    <button
      type="button"
      onClick={() => setDropped((value) => !value)}
      className={cn("inline-block cursor-pointer select-none border-0 bg-transparent p-0", className)}
      aria-pressed={dropped}
      aria-label={`${children} (toggle gravity)`}
    >
      {[...children].map((char, index) => (
        <span
          key={`${index}-${char}`}
          aria-hidden
          className="inline-block will-change-transform"
          style={{
            transform: active ? `translateY(${fall}px) rotate(${(index % 2 === 0 ? -1 : 1) * 6}deg)` : "translateY(0)",
            opacity: active ? 0.5 : 1,
            transition: `transform ${520 + index * 40}ms cubic-bezier(0.34, 1.4, 0.64, 1) ${index * 35}ms, opacity 300ms ease`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </button>
  );
}

export default GravityLetters;
