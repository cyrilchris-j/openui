"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticSplitRevealProps {
  label?: string;
  className?: string;
}

export function ElasticSplitReveal({
  label = "SYSTEM REVEALED",
  className,
}: ElasticSplitRevealProps) {
  const [opened, setOpened] = useState(false);

  return (
    <div className={cn("relative mx-auto h-72 w-full max-w-lg overflow-hidden border border-line bg-surface select-none", className)}>
      {/* Revealed content beneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-paper text-center">
        <span className="font-mono text-xs text-accent">PROTECTED CODENAME</span>
        <h4 className="mt-1 font-serif text-2xl font-bold text-ink">{label}</h4>
        <p className="mt-2 text-xs text-graphite max-w-xs leading-relaxed">
          The split aperture retracts outward with dual-phase spring overshoot.
        </p>
      </div>

      {/* Top half shutter */}
      <div
        style={{
          transform: opened ? "translateY(-105%)" : "translateY(0%)",
        }}
        className="absolute inset-x-0 top-0 h-1/2 bg-ink text-paper flex items-end justify-center pb-2 transition-transform duration-500 ease-spring border-b border-paper/20 z-10"
      >
        <span className="font-mono text-[10px] tracking-widest text-paper/70">TOP SHUTTER</span>
      </div>

      {/* Bottom half shutter */}
      <div
        style={{
          transform: opened ? "translateY(105%)" : "translateY(0%)",
        }}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink text-paper flex items-start justify-center pt-2 transition-transform duration-500 ease-spring border-t border-paper/20 z-10"
      >
        <span className="font-mono text-[10px] tracking-widest text-paper/70">BOTTOM SHUTTER</span>
      </div>

      {/* Toggle button */}
      <div className="absolute bottom-3 right-3 z-20">
        <button
          type="button"
          onClick={() => setOpened((v) => !v)}
          className="rounded border border-line bg-paper/90 backdrop-blur px-2.5 py-1 font-mono text-xs text-ink shadow-sm hover:bg-paper"
        >
          {opened ? "Close Aperture" : "Open Aperture"}
        </button>
      </div>
    </div>
  );
}
