"use client";

import { StrobeGridDots } from "./strobe-grid-dots";

export default function StrobeGridDotsDemo() {
  return (
    <StrobeGridDots className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Strobe Dots Array</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Target dots surrounded by fine rings.</p>
      </div>
    </StrobeGridDots>
  );
}
