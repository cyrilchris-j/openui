"use client";

import { cn } from "@/lib/cn";

export interface SteppedTimelineRailProps {
  className?: string;
}

export function SteppedTimelineRail({ className }: SteppedTimelineRailProps) {
  const steps = [
    { title: "Init Workspace", done: true },
    { title: "Validate Schemas", done: true },
    { title: "Compile Registry", done: false },
  ];

  return (
    <div className={cn("w-full max-w-xs font-mono text-xs space-y-3", className)}>
      {steps.map((s, idx) => (
        <div key={s.title} className="flex items-center gap-3">
          <div className={cn("h-6 w-6 rounded-full border flex items-center justify-center text-[10px] font-bold", s.done ? "border-ink bg-ink text-paper" : "border-line text-ink/40")}>
            {idx + 1}
          </div>
          <span className={cn(s.done ? "font-bold text-ink" : "text-ink/50")}>{s.title}</span>
        </div>
      ))}
    </div>
  );
}

export default SteppedTimelineRail;
