"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface StaggeredGlyphCascadeProps {
  text?: string;
  staggerMs?: number;
  className?: string;
}

export function StaggeredGlyphCascade({
  text = "KINETIC SYSTEM ARCHITECTURE",
  staggerMs = 38,
  className,
}: StaggeredGlyphCascadeProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
    const timeout = setTimeout(() => setActive(true), 50);
    return () => clearTimeout(timeout);
  }, [text]);

  const glyphs = Array.from(text);

  return (
    <div className={cn("overflow-hidden p-4", className)}>
      <div className="flex flex-wrap items-center justify-center font-mono text-2xl font-bold tracking-tight text-ink md:text-3xl">
        {glyphs.map((char, index) => {
          const delay = index * staggerMs;
          const wobble = (index % 5 - 2) * 4;
          return (
            <span
              key={index}
              style={{
                transitionDelay: `${delay}ms`,
                transform: active ? "translateY(0) rotate(0deg)" : `translateY(-120%) rotate(${wobble}deg)`,
                opacity: active ? 1 : 0,
              }}
              className="inline-block whitespace-pre transition-all duration-500 ease-out"
            >
              {char}
            </span>
          );
        })}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => {
            setActive(false);
            setTimeout(() => setActive(true), 120);
          }}
          className="rounded border border-line px-3 py-1 font-mono text-xs uppercase tracking-wider text-graphite hover:border-ink hover:text-ink"
        >
          Replay Cascade
        </button>
      </div>
    </div>
  );
}
