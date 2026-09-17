"use client";

import { VintageEngravingShading } from "./vintage-engraving-shading";

export default function VintageEngravingShadingDemo() {
  return (
    <VintageEngravingShading className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Intaglio Banknote</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Fine sinusoidal steel engraving guilloche lines.</p>
      </div>
    </VintageEngravingShading>
  );
}
