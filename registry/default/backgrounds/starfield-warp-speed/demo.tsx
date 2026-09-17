"use client";

import { StarfieldWarpSpeed } from "./starfield-warp-speed";

export default function StarfieldWarpSpeedDemo() {
  return (
    <StarfieldWarpSpeed className="min-h-[280px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-white">Hyperspace Velocity</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">3D radial star acceleration canvas.</p>
      </div>
    </StarfieldWarpSpeed>
  );
}
