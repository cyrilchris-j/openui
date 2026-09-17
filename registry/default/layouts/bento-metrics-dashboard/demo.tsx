"use client";

import { BentoMetricsDashboard } from "./bento-metrics-dashboard";

export default function BentoMetricsDashboardDemo() {
  return (
    <BentoMetricsDashboard>
      <div className="md:col-span-2 p-4 rounded-xl border border-line bg-surface/30">
        <span className="text-ink/60">Primary Throughput</span>
        <div className="text-lg font-bold text-ink mt-1">1.2 TB / day</div>
      </div>
      <div className="p-4 rounded-xl border border-line bg-surface/30">
        <span className="text-ink/60">Node Latency</span>
        <div className="text-lg font-bold text-accent mt-1">14ms</div>
      </div>
    </BentoMetricsDashboard>
  );
}
