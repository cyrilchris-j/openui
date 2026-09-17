"use client";

import { AbstractGeometricMandala } from "./abstract-geometric-mandala";

export default function AbstractGeometricMandalaDemo() {
  return (
    <AbstractGeometricMandala className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Concentric Rosette</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Multi-angle rotational square mandala.</p>
      </div>
    </AbstractGeometricMandala>
  );
}
