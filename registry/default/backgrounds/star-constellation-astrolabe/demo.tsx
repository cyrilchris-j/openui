"use client";

import { StarConstellationAstrolabe } from "./star-constellation-astrolabe";

export default function StarConstellationAstrolabeDemo() {
  return (
    <StarConstellationAstrolabe className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Navigation Astrolabe</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Ancient stereographic celestial rete coordinates.</p>
      </div>
    </StarConstellationAstrolabe>
  );
}
