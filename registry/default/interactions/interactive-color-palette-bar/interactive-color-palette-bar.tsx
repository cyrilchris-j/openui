"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveColorPaletteBarProps {
  className?: string;
}

export function InteractiveColorPaletteBar({ className }: InteractiveColorPaletteBarProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const swatches = ["#000000", "#333333", "#666666", "#999999", "#E5E5E5"];

  const copy = (hex: string) => {
    setCopied(hex);
    setTimeout(() => setCopied(null), 1000);
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">
        {copied ? `Copied ${copied}!` : "CLICK SWATCH TO COPY HEX"}
      </span>

      <div className="flex overflow-hidden rounded-lg border border-line">
        {swatches.map((hex) => (
          <div
            key={hex}
            onClick={() => copy(hex)}
            className="h-14 w-14 cursor-pointer transition-transform hover:scale-110 flex items-end justify-center pb-1"
            style={{ backgroundColor: hex }}
          >
            <span className="font-mono text-[8px] text-white/70">{hex.slice(1, 4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InteractiveColorPaletteBar;
