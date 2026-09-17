"use client";

import { SplitDashboardAnalytics } from "./split-dashboard-analytics";

export default function SplitDashboardAnalyticsDemo() {
  return (
    <SplitDashboardAnalytics
      chart={<div>Timeseries Telemetry Graph</div>}
      logs={<div>[12:04] Deployment Sync Complete<br />[12:03] Healthcheck 200 OK</div>}
    />
  );
}
