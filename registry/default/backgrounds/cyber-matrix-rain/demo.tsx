"use client";

import { CyberMatrixRain } from "./cyber-matrix-rain";

export default function CyberMatrixRainDemo() {
  return (
    <CyberMatrixRain className="min-h-[280px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-emerald-500/40 bg-black/80 backdrop-blur-md shadow-lg text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-emerald-400">Cyber Rain Stream</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Terminal data stream raining glyphs.</p>
      </div>
    </CyberMatrixRain>
  );
}
