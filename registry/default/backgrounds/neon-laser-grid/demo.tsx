"use client";

import { NeonLaserGrid } from "./neon-laser-grid";

export default function NeonLaserGridDemo() {
  return (
    <NeonLaserGrid className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-pink-500/40 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-pink-400">Arcade Laser Grid</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Dual-color cyan and magenta laser crosshatch.</p>
      </div>
    </NeonLaserGrid>
  );
}
