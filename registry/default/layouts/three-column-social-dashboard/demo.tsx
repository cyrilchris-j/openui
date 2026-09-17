"use client";

import { ThreeColumnSocialDashboard } from "./three-column-social-dashboard";

export default function ThreeColumnSocialDashboardDemo() {
  return (
    <ThreeColumnSocialDashboard
      left={<div className="p-4 rounded-xl border border-line bg-surface/30 text-xs">User Profile</div>}
      center={<div className="p-4 rounded-xl border border-line bg-paper text-xs">Chronological Social Stream</div>}
      right={<div className="p-4 rounded-xl border border-line bg-surface/30 text-xs">Trending Topics</div>}
    />
  );
}
