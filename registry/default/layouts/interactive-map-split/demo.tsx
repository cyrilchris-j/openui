"use client";

import { InteractiveMapSplit } from "./interactive-map-split";

export default function InteractiveMapSplitDemo() {
  return (
    <InteractiveMapSplit map={<div className="font-mono text-xs text-ink/60">Cartographic Geographic Map Viewport</div>}>
      <div className="p-3 rounded-xl border border-line bg-surface/30 text-xs">
        <div className="font-bold">US-East Datacenter</div>
        <div className="text-ink/60 mt-0.5">Virginia, USA • 14 Nodes</div>
      </div>
      <div className="p-3 rounded-xl border border-line bg-surface/30 text-xs">
        <div className="font-bold">EU-Central Datacenter</div>
        <div className="text-ink/60 mt-0.5">Frankfurt, Germany • 28 Nodes</div>
      </div>
    </InteractiveMapSplit>
  );
}
