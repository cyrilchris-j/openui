"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FluidDrawerPeekProps {
  className?: string;
}

export function FluidDrawerPeek({ className }: FluidDrawerPeekProps) {
  const [stage, setStage] = useState<"peek" | "open">("peek");

  return (
    <div className={cn("relative mx-auto h-80 w-full max-w-sm overflow-hidden rounded-lg border border-line bg-surface p-4", className)}>
      <div className="text-center pt-8">
        <span className="font-mono text-xs text-graphite uppercase">Main Canvas</span>
        <h4 className="font-serif text-lg font-bold text-ink mt-1">Inspection Deck</h4>
      </div>

      {/* Drawer */}
      <div
        style={{
          transform: stage === "open" ? "translateY(0%)" : "translateY(65%)",
        }}
        className="absolute inset-x-0 bottom-0 h-64 rounded-t-xl border-t border-line bg-paper p-4 shadow-xl transition-transform duration-400 ease-spring"
      >
        <div
          onClick={() => setStage((s) => (s === "open" ? "peek" : "open"))}
          className="mx-auto h-1.5 w-12 cursor-pointer rounded-full bg-line/80 hover:bg-ink/40 mb-3"
        />
        <div className="flex items-center justify-between border-b border-line/60 pb-2">
          <span className="font-mono text-xs font-semibold text-ink">DRAWER TELEMETRY</span>
          <button
            type="button"
            onClick={() => setStage((s) => (s === "open" ? "peek" : "open"))}
            className="font-mono text-[10px] text-accent uppercase"
          >
            {stage === "open" ? "Collapse ↓" : "Expand ↑"}
          </button>
        </div>
        <div className="mt-3 space-y-2 text-xs text-graphite">
          <div className="flex justify-between">
            <span>State</span>
            <span className="font-mono font-bold text-ink">{stage}</span>
          </div>
          <div className="flex justify-between">
            <span>Spring Damping</span>
            <span className="font-mono">0.82 Ratio</span>
          </div>
          <div className="flex justify-between">
            <span>Boundary Elasticity</span>
            <span className="font-mono">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
