"use client";

import { MetaballLavaLamp } from "./metaball-lava-lamp";

export default function MetaballLavaLampDemo() {
  return (
    <MetaballLavaLamp className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-rose-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-rose-400">Thermal Lava Lamp</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Buoyant wax convective liquid metaball flow.</p>
      </div>
    </MetaballLavaLamp>
  );
}
