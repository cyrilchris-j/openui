"use client";

import { InteractiveFeatureComparison } from "./interactive-feature-comparison";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/50">
      <InteractiveFeatureComparison />
    </div>
  );
}
