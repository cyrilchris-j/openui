"use client";

import { TopographicContourLines } from "./topographic-contour-lines";

export default function TopographicContourLinesDemo() {
  return (
    <TopographicContourLines className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Topographic Isobars</h3>
        <p className="text-xs text-ink/60 mt-1">Geographic elevation curves and natural topology.</p>
      </div>
    </TopographicContourLines>
  );
}
