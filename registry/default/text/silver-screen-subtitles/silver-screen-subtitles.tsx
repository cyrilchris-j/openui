"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface SubtitleCue {
  /** Start time, seconds. */
  start: number;
  /** End time, seconds. */
  end: number;
  text: string;
}

export interface SilverScreenSubtitlesProps {
  cues: SubtitleCue[];
  /** Total runtime in seconds; the demo loops a scrubber over it. */
  durationSeconds?: number;
  className?: string;
}

export function SilverScreenSubtitles({ cues, durationSeconds = 20, className }: SilverScreenSubtitlesProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTime((value) => (value + 0.25) % durationSeconds), 250);
    return () => window.clearInterval(timer);
  }, [durationSeconds]);

  const active = cues.find((cue) => time >= cue.start && time < cue.end);
  // Wrap at 42 chars per line, max 2 lines — the Netflix/TED guideline.
  const lines = active ? wrapLines(active.text, 42) : [];

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative flex h-40 items-end justify-center rounded-lg bg-gradient-to-b from-slate-800 to-slate-950">
        <span aria-hidden className="absolute left-3 top-3 font-mono text-[10px] text-white/40">
          {time.toFixed(1)}s / {durationSeconds}s
        </span>
        <p className="mb-6 max-w-[90%] text-center text-lg leading-snug text-white" role="status" aria-live="polite">
          {lines.map((line, index) => (
            <span key={index} className="block drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {line}
            </span>
          ))}
        </p>
      </div>
      <ul className="flex flex-wrap gap-1 font-mono text-[10px] text-ink/60" aria-hidden>
        {cues.map((cue, index) => (
          <li key={index} className={cn("rounded border px-1.5 py-0.5", active === cue ? "border-accent text-accent" : "border-line")}>
            {cue.start}-{cue.end}
          </li>
        ))}
      </ul>
    </div>
  );
}

function wrapLines(text: string, max: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = (current ? current + " " : "") + word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
}

export default SilverScreenSubtitles;
