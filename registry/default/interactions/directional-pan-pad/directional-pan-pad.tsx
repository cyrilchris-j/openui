"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DirectionalPanPadProps {
  className?: string;
}

export function DirectionalPanPad({ className }: DirectionalPanPadProps) {
  const [activeDir, setActiveDir] = useState<string | null>(null);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">DIRECTIONAL D-PAD</span>

      <div className="grid grid-cols-3 gap-1 w-32">
        <div />
        <button
          type="button"
          onClick={() => setActiveDir("UP")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ▲
        </button>
        <div />
        <button
          type="button"
          onClick={() => setActiveDir("LEFT")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ◀
        </button>
        <div className="h-10 rounded border border-line bg-line/20" />
        <button
          type="button"
          onClick={() => setActiveDir("RIGHT")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ▶
        </button>
        <div />
        <button
          type="button"
          onClick={() => setActiveDir("DOWN")}
          className="h-10 rounded border border-line bg-ink text-paper font-mono text-xs hover:opacity-80"
        >
          ▼
        </button>
        <div />
      </div>

      <span className="font-mono text-[10px] text-ink/40">{activeDir ?? "IDLE"}</span>
    </div>
  );
}

export default DirectionalPanPad;
