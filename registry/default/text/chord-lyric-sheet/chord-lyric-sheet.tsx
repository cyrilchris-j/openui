"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ChordLine {
  chords?: Array<{ name: string; column: number }>;
  lyric: string;
}

export interface ChordLyricSheetProps {
  title: string;
  lines: ChordLine[];
  /** Fingering lookup shown in the popover. */
  fingerings?: Record<string, string>;
  className?: string;
}

export function ChordLyricSheet({ title, lines, fingerings = {}, className }: ChordLyricSheetProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("max-w-prose font-mono text-sm", className)}>
      <h2 className="mb-4 text-base font-semibold tracking-wide text-ink">{title}</h2>
      {lines.map((line, index) => (
        <div key={index} className="mb-3 whitespace-pre" aria-label={`${(line.chords ?? []).map((chord) => chord.name).join(" ")} ${line.lyric}`}>
          {line.chords && (
            <div aria-hidden className="relative h-5 text-accent">
              {line.chords.map((chord, chordIndex) => (
                <span
                  key={chordIndex}
                  role="button"
                  tabIndex={0}
                  aria-label={`chord ${chord.name}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setActive(active === chord.name ? null : chord.name);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActive(active === chord.name ? null : chord.name);
                    }
                  }}
                  className="cursor-pointer font-semibold hover:underline"
                  style={{ position: "absolute", left: `${chord.column}ch` }}
                >
                  {chord.name}
                </span>
              ))}
            </div>
          )}
          <div className="text-ink/85">{line.lyric || "\u00A0"}</div>
        </div>
      ))}
      {active && fingerings[active] && (
        <p className="mt-2 inline-block rounded border border-line bg-paper px-3 py-1.5 text-xs text-ink" role="status">
          <strong className="text-accent">{active}</strong> · {fingerings[active]}
        </p>
      )}
    </div>
  );
}

export default ChordLyricSheet;
