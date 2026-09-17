"use client";

import { StackedTimelineStream } from "./stacked-timeline-stream";

export default function StackedTimelineStreamDemo() {
  return (
    <StackedTimelineStream>
      <div className="flex gap-3 items-start">
        <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-[10px] font-bold">AG</div>
        <div className="flex-1 p-3 rounded-lg border border-line bg-surface/30">
          <div className="font-semibold text-ink">Built 100 Backgrounds</div>
          <div className="text-[10px] text-ink/50 mt-0.5 font-mono">2 mins ago</div>
        </div>
      </div>
    </StackedTimelineStream>
  );
}
