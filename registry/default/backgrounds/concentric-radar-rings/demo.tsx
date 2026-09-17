"use client";

import { ConcentricRadarRings } from "./concentric-radar-rings";

export default function ConcentricRadarRingsDemo() {
  return (
    <ConcentricRadarRings className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Radar Rings Target</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Concentric range markers and crosshair lines.</p>
      </div>
    </ConcentricRadarRings>
  );
}
