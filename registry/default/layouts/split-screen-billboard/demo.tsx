"use client";

import { SplitScreenBillboard } from "./split-screen-billboard";

export default function SplitScreenBillboardDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <SplitScreenBillboard
        visual={<div className="font-mono text-sm font-bold text-accent">Interactive Visual Canvas</div>}
        narrative={
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-ink">Product Specification</h2>
            <p className="text-xs text-ink/70 leading-relaxed">
              The left half remains pinned in the viewport while the reader traverses sequential specification milestones.
            </p>
            <div className="p-4 rounded-lg bg-surface border border-line text-xs font-mono">
              Milestone 1: Zero runtime dependencies
            </div>
            <div className="p-4 rounded-lg bg-surface border border-line text-xs font-mono">
              Milestone 2: Sub-millisecond hydration
            </div>
          </div>
        }
      />
    </div>
  );
}
