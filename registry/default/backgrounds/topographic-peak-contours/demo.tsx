"use client";

import { TopographicPeakContours } from "./topographic-peak-contours";

export default function TopographicPeakContoursDemo() {
  return (
    <TopographicPeakContours className="min-h-[260px] flex items-center justify-center p-8">
      <div className="p-6 rounded-xl border border-line bg-paper/90 backdrop-blur-md shadow-md text-center max-w-sm">
        <h3 className="text-sm font-bold font-sans text-ink">Summit Peak Isobars</h3>
        <p className="text-xs text-ink/60 mt-1 font-sans">High-altitude alpine topographic peak contours.</p>
      </div>
    </TopographicPeakContours>
  );
}
