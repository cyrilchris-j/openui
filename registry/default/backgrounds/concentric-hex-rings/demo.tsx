"use client";

import { ConcentricHexRings } from "./concentric-hex-rings";

export default function ConcentricHexRingsDemo() {
  return (
    <ConcentricHexRings className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-emerald-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-emerald-400">Hexagonal Target</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Concentric nested hexagonal radar shells.</p>
      </div>
    </ConcentricHexRings>
  );
}
