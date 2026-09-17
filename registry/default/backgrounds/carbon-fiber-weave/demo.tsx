"use client";

import { CarbonFiberWeave } from "./carbon-fiber-weave";

export default function CarbonFiberWeaveDemo() {
  return (
    <CarbonFiberWeave className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-white">Carbon Twill Weave</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Structural motorsport carbon fiber twill.</p>
      </div>
    </CarbonFiberWeave>
  );
}
