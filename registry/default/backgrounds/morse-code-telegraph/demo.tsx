"use client";

import { MorseCodeTelegraph } from "./morse-code-telegraph";

export default function MorseCodeTelegraphDemo() {
  return (
    <MorseCodeTelegraph className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Morse Telegraph</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Horizontal dot-and-dash telegraph signal tracks.</p>
      </div>
    </MorseCodeTelegraph>
  );
}
