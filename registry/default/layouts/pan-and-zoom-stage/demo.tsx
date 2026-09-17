"use client";

import { PanAndZoomStage } from "./pan-and-zoom-stage";

export default function PanAndZoomStageDemo() {
  return (
    <PanAndZoomStage
      minimap={
        <div className="w-24 h-16 bg-surface/80 rounded border border-line/50 flex items-center justify-center font-mono text-[9px] text-ink/60">
          Mini-map
        </div>
      }
    >
      <div className="font-mono text-xs text-ink/50">Spatial Canvas Infinite Stage</div>
    </PanAndZoomStage>
  );
}
