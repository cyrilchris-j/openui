"use client";

import { HeroShowcaseSplit } from "./hero-showcase-split";

export default function HeroShowcaseSplitDemo() {
  return (
    <HeroShowcaseSplit
      headline={
        <>
          <h1 className="text-2xl font-bold text-ink tracking-tight">Design Registry for Autonomous Engineering</h1>
          <p className="text-xs text-ink/70 leading-relaxed">800 unique, installable components with architectural fingerprints.</p>
        </>
      }
      visual={<div className="font-mono text-xs text-accent font-bold">Interactive Component Node</div>}
    />
  );
}
