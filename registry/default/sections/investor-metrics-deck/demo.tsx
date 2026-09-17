"use client";

import { InvestorMetricsDeck } from "./investor-metrics-deck";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-white dark:bg-neutral-950">
      <InvestorMetricsDeck />
    </div>
  );
}
