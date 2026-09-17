"use client";

import { RadialBeamSpotlight } from "./radial-beam-spotlight";

export default function RadialBeamSpotlightDemo() {
  return (
    <RadialBeamSpotlight className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-white">Overhead Spotlight</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Focused optical beam illuminating focal point.</p>
      </div>
    </RadialBeamSpotlight>
  );
}
