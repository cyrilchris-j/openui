"use client";

import { GradientPrismRainbow } from "./gradient-prism-rainbow";

export default function GradientPrismRainbowDemo() {
  return (
    <GradientPrismRainbow className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-white">Optical Prism</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Spectral wavelength optical dispersion beam.</p>
      </div>
    </GradientPrismRainbow>
  );
}
