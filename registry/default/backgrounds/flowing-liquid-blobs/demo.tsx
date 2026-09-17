"use client";

import { FlowingLiquidBlobs } from "./flowing-liquid-blobs";

export default function FlowingLiquidBlobsDemo() {
  return (
    <FlowingLiquidBlobs className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Organic Metaballs</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Generative bezier morphing blob contours.</p>
      </div>
    </FlowingLiquidBlobs>
  );
}
