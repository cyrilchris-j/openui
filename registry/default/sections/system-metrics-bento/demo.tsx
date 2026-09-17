"use client";

import { SystemMetricsBento } from "./system-metrics-bento";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <SystemMetricsBento />
    </div>
  );
}
