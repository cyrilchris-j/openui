"use client";

import { SplitScrollFeatureShowcase } from "./split-scroll-feature-showcase";

export default function SplitScrollFeatureShowcaseDemo() {
  return (
    <SplitScrollFeatureShowcase canvas={<div className="font-mono text-xs font-bold text-accent">Feature Graphic Stage</div>}>
      <div className="space-y-2">
        <h3 className="text-base font-bold text-ink">01. Autonomous Discovery</h3>
        <p className="text-xs text-ink/60">Components automatically self-register without manual barrel manifests.</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-bold text-ink">02. Closed Schema Verification</h3>
        <p className="text-xs text-ink/60">Every component enforces strict TypeScript contract compliance.</p>
      </div>
    </SplitScrollFeatureShowcase>
  );
}
