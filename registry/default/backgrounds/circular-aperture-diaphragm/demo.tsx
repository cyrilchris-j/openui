"use client";

import { CircularApertureDiaphragm } from "./circular-aperture-diaphragm";

export default function CircularApertureDiaphragmDemo() {
  return (
    <CircularApertureDiaphragm className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-ink">Camera Lens Iris</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Mechanical 6-blade photographic diaphragm.</p>
      </div>
    </CircularApertureDiaphragm>
  );
}
