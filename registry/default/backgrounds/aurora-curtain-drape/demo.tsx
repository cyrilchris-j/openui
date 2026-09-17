"use client";

import { AuroraCurtainDrape } from "./aurora-curtain-drape";

export default function AuroraCurtainDrapeDemo() {
  return (
    <AuroraCurtainDrape className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-emerald-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-emerald-400">Polar Curtains</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Vertical curtains of solar wind atmospheric ion luminescence.</p>
      </div>
    </AuroraCurtainDrape>
  );
}
