"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface KaraokeReadAlongProps {
  /** Chunks to highlight in order. */
  chunks: string[];
  /** ms per chunk at speed 1. */
  chunkMs?: number;
  className?: string;
}

export function KaraokeReadAlong({ chunks, chunkMs = 900, className }: KaraokeReadAlongProps) {
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timer = useRef<number | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setIndex((value) => {
        const next = value + 1;
        if (next >= chunks.length) {
          setPlaying(false);
          return chunks.length - 1;
        }
        return next;
      });
    }, chunkMs / speed);
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
  }, [playing, chunkMs, speed, chunks.length]);

  return (
    <div className={cn("flex max-w-prose flex-col gap-4", className)}>
      <p className="text-lg leading-relaxed">
        {chunks.map((chunk, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "transition-colors duration-200",
              i === index ? "bg-accent/20 text-ink" : "text-ink/75",
              i < index ? "text-ink" : "",
            )}
          >
            {chunk}{" "}
          </span>
        ))}
        <span className="sr-only" aria-live={playing ? "assertive" : "off"}>
          {index >= 0 ? chunks[index] : ""}
        </span>
      </p>
      <div className="flex items-center gap-3 text-sm">
        <button
          type="button"
          onClick={() => {
            setIndex(-1);
            setPlaying(true);
          }}
          className="rounded-md border border-line px-3 py-1.5 hover:bg-line/20"
        >
          ▶ Start over
        </button>
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="rounded-md border border-line px-3 py-1.5 hover:bg-line/20"
        >
          {playing ? "⏸ Pause" : "⏵ Resume"}
        </button>
        <label className="flex items-center gap-2 font-mono text-xs text-ink/70">
          speed
          <input
            type="range"
            min={0.5}
            max={2.5}
            step={0.25}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            className="w-24"
          />
          {speed}×
        </label>
        {reduced && <span className="font-mono text-xs text-ink/50">reduced motion: highlight still applies</span>}
      </div>
    </div>
  );
}

export default KaraokeReadAlong;
