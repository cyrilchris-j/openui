"use client";

import { CommandCenterHUD } from "./command-center-hud";

export default function CommandCenterHUDDemo() {
  return (
    <CommandCenterHUD>
      {["Core CPU", "Memory Bus", "Network I/O", "Edge Ping", "Worker Pods", "Security Gate"].map((h) => (
        <div key={h} className="p-3 rounded border border-emerald-500/20 bg-black/60">
          <div className="text-emerald-500/60 text-[10px] uppercase font-bold">{h}</div>
          <div className="text-sm font-bold text-emerald-400 mt-1">NOMINAL [OK]</div>
        </div>
      ))}
    </CommandCenterHUD>
  );
}
