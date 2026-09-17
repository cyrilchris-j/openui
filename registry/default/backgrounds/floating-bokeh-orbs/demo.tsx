"use client";

import { FloatingBokehOrbs } from "./floating-bokeh-orbs";

export default function FloatingBokehOrbsDemo() {
  return (
    <FloatingBokehOrbs className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-white">Cinematic Bokeh</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Soft luminous focal discs with deep blur.</p>
      </div>
    </FloatingBokehOrbs>
  );
}
