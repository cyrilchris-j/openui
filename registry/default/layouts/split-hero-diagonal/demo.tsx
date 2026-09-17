"use client";

import { SplitHeroDiagonal } from "./split-hero-diagonal";

export default function SplitHeroDiagonalDemo() {
  return (
    <SplitHeroDiagonal
      headline={
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-ink">Autonomous Design Ecology</h1>
          <p className="text-xs text-ink/70">800 unique verified items with behavioral fingerprints.</p>
        </div>
      }
      visual={<div className="font-mono text-xs text-accent font-bold">Diagonal Visual Plane</div>}
    />
  );
}
