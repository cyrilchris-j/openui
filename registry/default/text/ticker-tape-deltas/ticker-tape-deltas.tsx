"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface TickerQuote {
  symbol: string;
  value: number;
  /** Change since previous tick. */
  delta: number;
}

export interface TickerTapeDeltasProps {
  /** Base quotes; values random-walk every tick. */
  quotes: Array<{ symbol: string; value: number }>;
  tickMs?: number;
  className?: string;
}

export function TickerTapeDeltas({ quotes, tickMs = 1200, className }: TickerTapeDeltasProps) {
  const [live, setLive] = useState<TickerQuote[]>(() =>
    quotes.map((quote) => ({ ...quote, delta: 0 })),
  );
  const flash = useRef(new Map<string, "up" | "down">());

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setLive((current) =>
        current.map((quote) => {
          const drift = (Math.random() - 0.5) * quote.value * 0.02;
          const next = Math.max(0.01, quote.value + drift);
          const delta = next - quote.value;
          flash.current.set(quote.symbol, delta >= 0 ? "up" : "down");
          return { ...quote, value: Number(next.toFixed(2)), delta: Number(delta.toFixed(2)) };
        }),
      );
    }, tickMs);
    return () => window.clearInterval(timer);
  }, [tickMs]);

  const doubled = [...live, ...live];

  return (
    <div className={cn("overflow-hidden rounded-lg border border-line bg-ink py-2", className)} role="status" aria-label="Live quotes">
      <div
        aria-hidden
        className="flex w-max gap-8 px-4"
        style={{ animation: "openui-tape 18s linear infinite" }}
      >
        {doubled.map((quote, index) => {
          const flashState = flash.current.get(quote.symbol);
          return (
            <span key={index} className="flex items-baseline gap-2 font-mono text-sm whitespace-nowrap">
              <span className="font-semibold text-paper/90">{quote.symbol}</span>
              <span className="tabular-nums text-paper/70">{quote.value.toFixed(2)}</span>
              <span className={cn("flex items-center gap-0.5 tabular-nums", quote.delta >= 0 ? "text-emerald-400" : "text-red-400")}>
                <span aria-hidden>{quote.delta >= 0 ? "▲" : "▼"}</span>
                {Math.abs(quote.delta).toFixed(2)}
              </span>
              {flashState && (
                <span
                  className="pointer-events-none absolute inset-0 rounded"
                  style={{ background: flashState === "up" ? "rgba(52,211,153,0.14)" : "rgba(248,113,113,0.14)" }}
                />
              )}
            </span>
          );
        })}
      </div>
      <style>{`@keyframes openui-tape { from { transform: translateX(0) } to { transform: translateX(-50%) } } @media (prefers-reduced-motion: reduce) { div { animation: none !important } }`}</style>
    </div>
  );
}

export default TickerTapeDeltas;
