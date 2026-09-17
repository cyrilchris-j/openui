"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface BaselineGridOverlayProps {
  children: string;
  /** Baseline unit in px. */
  baseline?: number;
  className?: string;
}

export function BaselineGridOverlay({ children, baseline = 24, className }: BaselineGridOverlayProps) {
  const [show, setShow] = useState(true);
  const id = useId();

  return (
    <div className={cn("relative flex flex-col gap-4", className)}>
      <style>{`#${CSS.escape(id)} { background-image: repeating-linear-gradient(to bottom, transparent 0, transparent calc(var(--bl) - 1px), rgba(226, 98, 74, 0.25) calc(var(--bl) - 1px), rgba(226, 98, 74, 0.25) var(--bl)); } @media (prefers-reduced-motion: reduce) { * { transition: none !important } }`}</style>
      <div
        id={id}
        aria-hidden={false}
        style={{ "--bl": `${baseline}px` } as React.CSSProperties}
        className="max-w-prose px-3 py-0 text-base leading-relaxed text-ink"
      >
        {children}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShow((value) => !value)}
          aria-pressed={show}
          className="rounded border border-line px-2 py-1 font-mono text-xs text-ink/70 hover:bg-line/20"
        >
          grid: {show ? "on" : "off"}
        </button>
        <span className="font-mono text-xs text-ink/50">baseline {baseline}px</span>
      </div>
    </div>
  );
}

export default BaselineGridOverlay;
