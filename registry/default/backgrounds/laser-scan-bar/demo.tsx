"use client";

import { LaserScanBar } from "./laser-scan-bar";

export default function LaserScanBarDemo() {
  return (
    <LaserScanBar className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-red-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-red-400">Security Laser Beam</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Horizontal barcode scanning laser pulse.</p>
      </div>
    </LaserScanBar>
  );
}
