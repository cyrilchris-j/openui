"use client";

import { InterlockingRingsPattern } from "./interlocking-rings-pattern";

export default function InterlockingRingsPatternDemo() {
  return (
    <InterlockingRingsPattern className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-serif text-ink">Interlocking Rings</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Classic geometric intersecting circle lattice.</p>
      </div>
    </InterlockingRingsPattern>
  );
}
