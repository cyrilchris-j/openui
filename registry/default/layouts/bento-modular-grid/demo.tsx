"use client";

import { BentoModularGrid } from "./bento-modular-grid";

export default function BentoModularGridDemo() {
  return (
    <BentoModularGrid>
      <div className="md:col-span-2 p-6 rounded-2xl border border-line bg-surface/30">
        <h3 className="text-sm font-bold text-ink">Primary Metric Hub</h3>
        <p className="text-xs text-ink/60 mt-1">Wide spanning bento card for complex visualizations.</p>
      </div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30">
        <h3 className="text-sm font-bold text-ink">Status Beacon</h3>
        <p className="text-xs text-ink/60 mt-1">Single column status card.</p>
      </div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30">
        <h3 className="text-sm font-bold text-ink">Action Panel</h3>
        <p className="text-xs text-ink/60 mt-1">Secondary interaction card.</p>
      </div>
      <div className="md:col-span-2 p-6 rounded-2xl border border-line bg-surface/30">
        <h3 className="text-sm font-bold text-ink">Telemetry Stream</h3>
        <p className="text-xs text-ink/60 mt-1">Double column bottom card.</p>
      </div>
    </BentoModularGrid>
  );
}
