"use client";

import { TimelineMilestoneRail } from "./timeline-milestone-rail";

export default function TimelineMilestoneRailDemo() {
  return (
    <TimelineMilestoneRail>
      {[1, 2].map((m) => (
        <div key={m} className="relative pl-8">
          <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-accent -translate-x-1/2" />
          <div className="p-4 rounded-xl border border-line bg-paper text-xs">
            <div className="font-mono font-bold text-accent">Milestone 0{m}</div>
            <div className="text-ink font-semibold mt-0.5">800 Real Working Resources Deployed</div>
          </div>
        </div>
      ))}
    </TimelineMilestoneRail>
  );
}
