"use client";

import { FallingMatrixSymbols } from "./falling-matrix-symbols";

export default function FallingMatrixSymbolsDemo() {
  return (
    <FallingMatrixSymbols className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Calculus Glyphs</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Buoyant floating mathematical operators.</p>
      </div>
    </FallingMatrixSymbols>
  );
}
