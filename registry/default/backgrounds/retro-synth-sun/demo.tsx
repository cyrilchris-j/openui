"use client";

import { RetroSynthSun } from "./retro-synth-sun";

export default function RetroSynthSunDemo() {
  return (
    <RetroSynthSun className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-pink-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-pink-400">Outrun Sunset Disc</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Horizontal sliced retro sunset blinds.</p>
      </div>
    </RetroSynthSun>
  );
}
