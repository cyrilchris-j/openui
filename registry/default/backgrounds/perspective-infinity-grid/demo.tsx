"use client";

import { PerspectiveInfinityGrid } from "./perspective-infinity-grid";

export default function PerspectiveInfinityGridDemo() {
  return (
    <PerspectiveInfinityGrid className="min-h-[280px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-purple-500/40 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-purple-400">Horizon Wireframe</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Vanishing point receding ground plane.</p>
      </div>
    </PerspectiveInfinityGrid>
  );
}
