"use client";

import { DiagonalStripesPattern } from "./diagonal-stripes-pattern";

export default function DiagonalStripesPatternDemo() {
  return (
    <DiagonalStripesPattern className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Fine Pinstripe</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">Precision 45-degree diagonal hairline rhythm.</p>
      </div>
    </DiagonalStripesPattern>
  );
}
