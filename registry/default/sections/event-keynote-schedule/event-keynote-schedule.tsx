"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface AgendaItem {
  time: string;
  stage: string;
  title: string;
  speaker: string;
  role: string;
}

export interface EventKeynoteScheduleProps extends React.HTMLAttributes<HTMLElement> {
  agenda?: AgendaItem[];
}

const DEFAULT_AGENDA: AgendaItem[] = [
  { time: "09:00 AM", stage: "Main Stage", title: "Opening Keynote: The Post-Framework Web Interface", speaker: "Cyril Chris", role: "OpenUI Creator" },
  { time: "10:30 AM", stage: "Stage A (Edge)", title: "Sub-10ms Global State Synthesis with SQLite Isolates", speaker: "Elena Rostova", role: "Distributed Systems Lead" },
  { time: "01:00 PM", stage: "Stage B (Design)", title: "Mathematical Invariants of Design Systems in Code", speaker: "Marcus Vance", role: "Design Systems Engineer" },
  { time: "03:30 PM", stage: "Main Stage", title: "Closing Panel: What 1000 Engineers Taught Us About Components", speaker: "Panel of Core Maintainers", role: "Open Source Collective" },
];

export function EventKeynoteSchedule({
  agenda = DEFAULT_AGENDA,
  className,
  ...props
}: EventKeynoteScheduleProps) {
  const [selectedStage, setSelectedStage] = React.useState("All");

  const stages = ["All", "Main Stage", "Stage A (Edge)", "Stage B (Design)"];
  const filtered = selectedStage === "All" ? agenda : agenda.filter((a) => a.stage === selectedStage);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b-2 border-neutral-900 dark:border-neutral-100 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest font-bold text-neutral-500">
            OpenUI Summit 2026
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
            Conference Agenda
          </h2>
        </div>
        <div className="flex flex-wrap gap-1 font-mono text-xs">
          {stages.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setSelectedStage(st)}
              className={cn(
                "px-3 py-1 border transition-colors",
                selectedStage === st
                  ? "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900"
                  : "border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 font-mono">
        {filtered.map((item, idx) => (
          <div key={idx} className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-3 text-sm font-bold text-neutral-900 dark:text-neutral-100">
              {item.time}
            </div>
            <div className="md:col-span-6">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                {item.stage}
              </span>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mt-1 font-sans">
                {item.title}
              </h3>
            </div>
            <div className="md:col-span-3 text-right text-xs">
              <div className="font-bold text-neutral-900 dark:text-neutral-100">{item.speaker}</div>
              <div className="text-neutral-500 text-[11px]">{item.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
