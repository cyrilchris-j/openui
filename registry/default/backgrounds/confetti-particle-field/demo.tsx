"use client";

import { ConfettiParticleField } from "./confetti-particle-field";

export default function ConfettiParticleFieldDemo() {
  return (
    <ConfettiParticleField className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Celebration Confetti</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Slow fluttering geometric paper particles.</p>
      </div>
    </ConfettiParticleField>
  );
}
