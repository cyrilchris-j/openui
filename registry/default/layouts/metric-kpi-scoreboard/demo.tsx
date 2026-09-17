"use client";

import { MetricKPIScoreboard } from "./metric-kpi-scoreboard";

export default function MetricKPIScoreboardDemo() {
  return (
    <MetricKPIScoreboard>
      <div><span className="text-ink/60">ARR</span><div className="text-lg font-bold text-ink mt-1">$4.2M</div></div>
      <div><span className="text-ink/60">Active Users</span><div className="text-lg font-bold text-ink mt-1">128.4K</div></div>
      <div><span className="text-ink/60">Retention</span><div className="text-lg font-bold text-accent mt-1">94.8%</div></div>
      <div><span className="text-ink/60">NPS Score</span><div className="text-lg font-bold text-emerald-600 mt-1">+72</div></div>
    </MetricKPIScoreboard>
  );
}
