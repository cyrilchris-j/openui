"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SwatchWord {
  name: string;
  hex: string;
}

export interface SwatchWordsProps {
  swatches: SwatchWord[];
  className?: string;
}

export function SwatchWords({ swatches, className }: SwatchWordsProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (swatch: SwatchWord) => {
    try {
      await navigator.clipboard.writeText(swatch.hex);
      setCopied(swatch.hex);
      window.setTimeout(() => setCopied(null), 1400);
    } catch {
      setCopied(null);
    }
  };

  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-2 text-lg", className)}>
      {swatches.map((swatch) => (
        <button
          key={swatch.hex}
          type="button"
          onClick={() => copy(swatch)}
          className="inline-flex cursor-pointer items-baseline gap-1.5 border-0 bg-transparent p-0 transition-transform hover:scale-105"
          aria-label={`Copy ${swatch.name} ${swatch.hex}`}
        >
          <span
            aria-hidden
            className="inline-block h-3.5 w-3.5 self-center rounded-full border border-black/10"
            style={{ background: swatch.hex }}
          />
          <span style={{ color: swatch.hex }} className="font-semibold">
            {swatch.name}
          </span>
        </button>
      ))}
      {copied && (
        <span role="status" className="rounded bg-ink px-2 py-0.5 font-mono text-xs text-paper" style={{ animation: "openui-toast 1400ms ease both" }}>
          {copied} copied
        </span>
      )}
      <style>{`@keyframes openui-toast { 0% { opacity: 0; transform: translateY(4px) } 12% { opacity: 1; transform: translateY(0) } 88% { opacity: 1 } 100% { opacity: 0 } }`}</style>
    </p>
  );
}

export default SwatchWords;
