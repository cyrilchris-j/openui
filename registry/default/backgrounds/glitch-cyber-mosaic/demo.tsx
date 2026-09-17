"use client";

import { GlitchCyberMosaic } from "./glitch-cyber-mosaic";

export default function GlitchCyberMosaicDemo() {
  return (
    <GlitchCyberMosaic className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-sky-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-sky-400">Cyber Glitch Shards</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Digital stream dislocation horizontal artifacts.</p>
      </div>
    </GlitchCyberMosaic>
  );
}
