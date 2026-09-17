"use client";

import { SplitSpecComparator } from "./split-spec-comparator";

export default function SplitSpecComparatorDemo() {
  return (
    <SplitSpecComparator
      itemA={<div><span className="font-bold">Framework Alpha</span><br />Bundle: 120 KB<br />Hydration: 42ms</div>}
      itemB={<div><span className="font-bold text-accent">OpenUI Core</span><br />Bundle: 14 KB<br />Hydration: 1.2ms</div>}
    />
  );
}
