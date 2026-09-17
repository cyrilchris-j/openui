"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface RsvpSpeedReaderProps {
  text: string;
  /** Words per minute. */
  wpm?: number;
  className?: string;
}

/** Index of the optimal recognition point (~1/3 into the word). */
function orpIndex(word: string): number {
  if (word.length <= 1) return 0;
  if (word.length <= 5) return 1;
  return Math.floor(word.length / 3) + 1;
}

export function RsvpSpeedReader({ text, wpm = 300, className }: RsvpSpeedReaderProps) {
  const words = text.split(/\s+/).filter(Boolean);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(wpm);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) return;
    const interval = 60000 / speed;
    timer.current = window.setInterval(() => {
      setIndex((value) => {
        if (value + 1 >= words.length) {
          setPlaying(false);
          return value;
        }
        return value + 1;
      });
    }, interval);
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    };
  }, [playing, speed, words.length]);

  const word = words[index] ?? "";
  const orp = orpIndex(word);
  const pivotOffset = Math.min(orp * 0.6, 10); // ch units the pivot shifts left

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div
        className="relative flex h-20 items-center justify-center overflow-hidden rounded-lg border border-line bg-ink font-mono"
        role="status"
        aria-label={playing ? `Reading word ${index + 1} of ${words.length}: ${word}` : `Paused at word ${index + 1}`}
      >
        <span aria-hidden className="absolute left-1/2 h-full w-px bg-line/40" />
        <span aria-hidden className="whitespace-pre text-2xl text-paper" style={{ transform: `translateX(${-pivotOffset}ch)` }}>
          <span className="text-paper/70">{word.slice(0, orp)}</span>
          <span className="text-red-400">{word[orp]}</span>
          <span className="text-paper/70">{word.slice(orp + 1)}</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPlaying((value) => !value)}
          className="rounded-md border border-line px-3 py-1.5 font-mono text-sm hover:bg-line/20"
        >
          {playing ? "⏸" : "▶"}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            setIndex(0);
          }}
          className="rounded-md border border-line px-3 py-1.5 font-mono text-sm hover:bg-line/20"
        >
          ↺
        </button>
        <input
          type="range"
          min={150}
          max={700}
          step={25}
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value))}
          aria-label="Words per minute"
          className="w-40"
        />
        <span className="font-mono text-xs text-ink/60">{speed} wpm</span>
        <span className="font-mono text-xs text-ink/40 tabular-nums">
          {index + 1}/{words.length}
        </span>
      </div>
    </div>
  );
}

export default RsvpSpeedReader;
