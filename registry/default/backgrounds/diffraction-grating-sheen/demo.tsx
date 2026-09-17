"use client";

import { DiffractionGratingSheen } from "./diffraction-grating-sheen";

export default function DiffractionGratingSheenDemo() {
  return (
    <DiffractionGratingSheen className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-white">Iridescent Hologram</h3>
        <p className="text-xs text-white/70 mt-1 font-sans">Multi-spectrum conic diffraction foil luster.</p>
      </div>
    </DiffractionGratingSheen>
  );
}
