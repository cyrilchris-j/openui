"use client";

import { SubtleIsometricCircuit } from "./subtle-isometric-circuit";

export default function SubtleIsometricCircuitDemo() {
  return (
    <SubtleIsometricCircuit className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Axonometric PCB</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Three-dimensional perspective circuit board traces.</p>
      </div>
    </SubtleIsometricCircuit>
  );
}
