"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

interface RatioItem {
  label: string;
  w: number;
  h: number;
}

const RATIOS: RatioItem[] = [
  { label: "16:9", w: 16, h: 9 },
  { label: "4:3", w: 4, h: 3 },
  { label: "1:1", w: 1, h: 1 },
  { label: "9:16", w: 9, h: 16 },
];

export function AspectRatioSelector({ className }: { className?: string }) {
  const [selected, setSelected] = useState<RatioItem>(RATIOS[0]!);

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-xs w-full flex flex-col items-center font-mono shadow-sm", className)}>
      <div className="w-full h-36 bg-surface/50 rounded-lg flex items-center justify-center p-3 mb-4">
        <div
          className="border-2 border-dashed border-accent bg-accent/10 rounded transition-all flex items-center justify-center text-accent text-xs font-bold"
          style={{
            aspectRatio: `${selected.w} / ${selected.h}`,
            maxHeight: "100%",
            maxWidth: "100%",
          }}
        >
          {selected.label}
        </div>
      </div>

      <div className="flex items-center gap-1.5 w-full">
        {RATIOS.map((r) => (
          <button
            key={r.label}
            type="button"
            onClick={() => setSelected(r)}
            className={cn(
              "flex-1 py-1 rounded text-xs transition-colors",
              selected.label === r.label ? "bg-accent text-white font-bold" : "bg-surface text-ink/70 hover:bg-line/40"
            )}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
