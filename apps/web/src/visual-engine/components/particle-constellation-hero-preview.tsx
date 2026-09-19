import * as React from "react";
import { QuantumLattice } from "../backgrounds/quantum-lattice.js";

export function ParticleConstellationHeroPreview(): React.JSX.Element {
  return (
    <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-[#0d0f14]">
      {/* Interactive background particle field */}
      <QuantumLattice
        nodeCount={36}
        lineDistance={90}
        color="#38bdf8"
        className="absolute inset-0 z-0"
      />

      {/* Centered Hero Headline */}
      <div className="relative z-10 text-center pointer-events-none p-4">
        <span className="px-2.5 py-0.5 rounded-full border border-sky-400/40 bg-sky-950/60 font-mono text-[9px] text-sky-300 uppercase tracking-widest">
          QUANTUM MESH
        </span>
        <h3 className="mt-2 font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
          PARTICLE CONSTELLATION
        </h3>
        <p className="mt-1 font-mono text-[10px] text-sky-200/60">
          HOVER OR DRAG TO DEFLECT ATOMIC BONDS
        </p>
      </div>
    </div>
  );
}
