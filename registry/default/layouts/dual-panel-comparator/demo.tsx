"use client";

import { DualPanelComparator } from "./dual-panel-comparator";

export default function DualPanelComparatorDemo() {
  return (
    <DualPanelComparator
      leftTitle="Original Specification"
      rightTitle="Optimized Bundle"
      left={<div className="text-xs font-mono text-ink/70">Payload: 240 KB • Latency: 120ms</div>}
      right={<div className="text-xs font-mono text-emerald-600 font-semibold">Payload: 42 KB • Latency: 18ms</div>}
    />
  );
}
