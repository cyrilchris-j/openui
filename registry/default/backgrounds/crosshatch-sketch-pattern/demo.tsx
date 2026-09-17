"use client";

import { CrosshatchSketchPattern } from "./crosshatch-sketch-pattern";

export default function CrosshatchSketchPatternDemo() {
  return (
    <CrosshatchSketchPattern className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Etched Crosshatch</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Dual 45-degree crosshatch drawing texture.</p>
      </div>
    </CrosshatchSketchPattern>
  );
}
