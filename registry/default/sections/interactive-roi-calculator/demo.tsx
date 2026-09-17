"use client";

import { InteractiveRoiCalculator } from "./interactive-roi-calculator";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900/50">
      <InteractiveRoiCalculator />
    </div>
  );
}
