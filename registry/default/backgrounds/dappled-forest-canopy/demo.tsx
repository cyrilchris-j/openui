"use client";

import { DappledForestCanopy } from "./dappled-forest-canopy";

export default function DappledForestCanopyDemo() {
  return (
    <DappledForestCanopy className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Sunbeam Foliage</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Filtered crepuscular woodland sunbeams.</p>
      </div>
    </DappledForestCanopy>
  );
}
