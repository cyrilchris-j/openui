"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface AcrosticColumnProps {
  /** The hidden word; each letter heads one line. */
  hidden: string;
  /** Line bodies; lines[i] follows hidden[i]. Extra lines allowed. */
  lines: string[];
  className?: string;
}

export function AcrosticColumn({ hidden, lines, className }: AcrosticColumnProps) {
  const [lit, setLit] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const letters = [...hidden.toUpperCase()];

  return (
    <figure className={cn("flex max-w-md flex-col gap-3", className)}>
      <div
        className="grid gap-y-1.5"
        style={{ gridTemplateColumns: "2rem 1fr" }}
        onMouseEnter={() => setLit(true)}
        onMouseLeave={() => setLit(false)}
        role="group"
        aria-label={`Acrostic poem. Hidden word: ${hidden}.`}
      >
        {lines.map((line, index) => {
          const initial = letters[index];
          return (
            <FragmentRow key={index} row={index + 1}>
              <span
                aria-hidden
                className="select-none text-right font-display text-lg font-semibold transition-colors duration-300"
                style={{
                  gridColumn: 1,
                  color: lit && initial ? "#e2624a" : initial ? "var(--openui-ink, #1c1c1e)" : "transparent",
                }}
              >
                {initial ?? ""}
              </span>
              <span className="font-display text-lg leading-relaxed text-ink/85" style={{ gridColumn: 2 }}>
                {line || "\u00A0"}
              </span>
            </FragmentRow>
          );
        })}
      </div>
      <figcaption className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setRevealed((value) => !value)}
          aria-pressed={revealed}
          className="rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
        >
          {revealed ? `message: ${hidden}` : "reveal message"}
        </button>
      </figcaption>
    </figure>
  );
}

function FragmentRow({ row, children }: { row: number; children: React.ReactNode }) {
  return (
    <div className="contents" style={{ gridRow: row }}>
      {children}
    </div>
  );
}

export default AcrosticColumn;
