"use client";

import { FlowingTopologicalBands } from "./flowing-topological-bands";

export default function FlowingTopologicalBandsDemo() {
  return (
    <FlowingTopologicalBands className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Topological Bands</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Organic elevation contour band harmonics.</p>
      </div>
    </FlowingTopologicalBands>
  );
}
