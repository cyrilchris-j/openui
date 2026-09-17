"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PageShutterTransitionProps {
  className?: string;
}

export function PageShutterTransition({ className }: PageShutterTransitionProps) {
  const [closed, setClosed] = useState(false);

  return (
    <div className={cn("relative h-80 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <h4 className="font-display text-lg font-bold text-ink">Aperture Shutter</h4>
        <p className="mt-1 text-xs text-ink/70">Wipes viewport through sequenced horizontal blades.</p>
        <button
          type="button"
          onClick={() => setClosed((c) => !c)}
          className="mt-4 rounded border border-line bg-ink px-4 py-2 font-mono text-xs text-paper"
        >
          {closed ? "Open Shutter" : "Trigger Wipe"}
        </button>
      </div>

      {/* Shutter Blades */}
      <div className="pointer-events-none absolute inset-0 flex flex-col">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-ink transition-transform duration-300 ease-in-out"
            style={{
              transform: closed ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: i % 2 === 0 ? "left" : "right",
              transitionDelay: `${i * 40}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default PageShutterTransition;
