"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const FLAPS = " ABCDEFGHIJ0123456789:".split("");

export interface SplitFlapBoardProps {
  /** The message the board should resolve to. */
  message: string;
  cells?: number;
  className?: string;
}

export function SplitFlapBoard({ message, cells = 16, className }: SplitFlapBoardProps) {
  const [shown, setShown] = useState<string[]>(() => Array.from({ length: cells }, () => " "));

  useEffect(() => {
    const padded = message.slice(0, cells).padEnd(cells, " ").toUpperCase();
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown([...padded]);
      return;
    }

    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      setShown((current) => {
        let changed = false;
        const next = current.map((char, index) => {
          const target = padded[index] ?? " ";
          if (char === target) return char;
          changed = true;
          const from = FLAPS.indexOf(char);
          return FLAPS[(from + 1) % FLAPS.length]!;
        });
        if (changed) window.setTimeout(tick, 90);
        return next;
      });
    };
    const start = window.setTimeout(tick, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, [message, cells]);

  return (
    <div className={cn("inline-flex gap-1 rounded-lg bg-ink p-2", className)} role="status" aria-label={message}>
      {shown.map((char, index) => (
        <span key={index} aria-hidden className="relative h-10 w-7 overflow-hidden rounded-sm bg-[#1c1c1f]">
          <span className="absolute left-0 top-0 h-1/2 w-full border-b border-black/60" />
          <span
            key={char}
            className="absolute inset-x-0 top-0 flex h-full items-center justify-center font-mono text-lg text-amber-200"
            style={{ animation: "openui-flap 90ms ease-in" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
      <style>{`@keyframes openui-flap { 0% { transform: rotateX(-70deg); opacity: 0.3 } 100% { transform: rotateX(0); opacity: 1 } } @media (prefers-reduced-motion: reduce) { span { animation: none !important } }`}</style>
    </div>
  );
}

export default SplitFlapBoard;
