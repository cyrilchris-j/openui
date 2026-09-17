"use client";

import { FullscreenCanvasOverlay } from "./fullscreen-canvas-overlay";

export default function FullscreenCanvasOverlayDemo() {
  return (
    <FullscreenCanvasOverlay
      topLeft={<div className="px-2.5 py-1 rounded bg-paper/90 border border-line font-mono text-[10px]">FPS: 60.0</div>}
      topRight={<div className="px-2.5 py-1 rounded bg-paper/90 border border-line font-mono text-[10px]">Zoom: 100%</div>}
      bottomLeft={<div className="px-2.5 py-1 rounded bg-paper/90 border border-line font-mono text-[10px]">Coordinates: (0, 0)</div>}
      bottomRight={<div className="px-2.5 py-1 rounded bg-paper/90 border border-line font-mono text-[10px]">Layers: 4</div>}
    >
      <div className="font-mono text-xs text-ink/40">3D WebGL / Canvas Stage</div>
    </FullscreenCanvasOverlay>
  );
}
