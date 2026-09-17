"use client";

import { SoundwaveRadialPulse } from "./soundwave-radial-pulse";

export default function SoundwaveRadialPulseDemo() {
  return (
    <SoundwaveRadialPulse className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-cyan-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-cyan-400">Sonar Echolocation</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Radial acoustic wave emission rings.</p>
      </div>
    </SoundwaveRadialPulse>
  );
}
