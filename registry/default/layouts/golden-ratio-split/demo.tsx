"use client";

import { GoldenRatioSplit } from "./golden-ratio-split";

export default function GoldenRatioSplitDemo() {
  return (
    <GoldenRatioSplit
      major={
        <div>
          <h2 className="text-xl font-bold font-serif text-ink mb-2">Major Sector (61.8%)</h2>
          <p className="text-xs text-ink/70 leading-relaxed">
            The primary quadrant anchors the dominant narrative flow, adhering mathematically to the divine proportion.
          </p>
        </div>
      }
      minor={
        <div>
          <h3 className="text-sm font-bold font-mono text-accent mb-2">Minor Sector (38.2%)</h3>
          <p className="text-xs text-ink/60">Complementary contextual aside harmonically aligned.</p>
        </div>
      }
    />
  );
}
