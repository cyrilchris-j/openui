"use client";

import { CyberneticHexShield } from "./cybernetic-hex-shield";

export default function CyberneticHexShieldDemo() {
  return (
    <CyberneticHexShield className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-cyan-500/30 bg-black/70 backdrop-blur-md shadow-xl text-center max-w-sm">
        <h3 className="text-sm font-bold font-mono text-cyan-400">Force Field Shield</h3>
        <p className="text-xs text-white/70 mt-1 font-mono">Honeycomb deflector kinetic energy barrier.</p>
      </div>
    </CyberneticHexShield>
  );
}
