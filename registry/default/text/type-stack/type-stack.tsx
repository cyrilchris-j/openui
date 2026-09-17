"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TypeStackProps {
  phrases: string[];
  /** Milliseconds each phrase holds. */
  interval?: number;
  className?: string;
}

export function TypeStack({ phrases, interval = 2600, className }: TypeStackProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const longest = phrases.reduce((max, phrase) => Math.max(max, phrase.length), 0);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(
      () => setActive((value) => (value + 1) % phrases.length),
      interval,
    );
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
  }, [paused, phrases.length, interval]);

  return (
    <span
      className={cn("relative inline-grid overflow-hidden align-bottom", className)}
      style={{ minHeight: "1.2em", minWidth: `${longest}ch` }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={0}
      role="status"
      aria-label={phrases[active]}
    >
      {phrases.map((phrase, index) => (
        <span
          key={phrase}
          aria-hidden={index !== active}
          className={cn(
            "col-start-1 row-start-1 transition-[transform,opacity] duration-normal ease-editorial motion-reduce:transition-none",
            index === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
          )}
        >
          {phrase}
        </span>
      ))}
    </span>
  );
}

export default TypeStack;
