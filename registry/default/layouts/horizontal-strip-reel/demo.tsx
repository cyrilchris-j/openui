"use client";

import { HorizontalStripReel } from "./horizontal-strip-reel";

export default function HorizontalStripReelDemo() {
  return (
    <HorizontalStripReel>
      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="w-64 shrink-0 snap-start p-6 rounded-2xl border border-line bg-surface/40 flex flex-col justify-between h-40"
        >
          <div className="font-mono text-xs font-bold text-ink">Slide {item}</div>
          <p className="text-xs text-ink/60 font-sans">Smooth momentum horizontal card container.</p>
        </div>
      ))}
    </HorizontalStripReel>
  );
}
