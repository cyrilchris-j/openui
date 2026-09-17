"use client";

import { AuroraBorealisGlow } from "./aurora-borealis-glow";

export default function AuroraBorealisGlowDemo() {
  return (
    <AuroraBorealisGlow className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-white">Northern Lights</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Deep multi-spectrum atmospheric glow.</p>
      </div>
    </AuroraBorealisGlow>
  );
}
