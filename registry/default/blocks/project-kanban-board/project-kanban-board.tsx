"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface KanbanTask {
  id: string;
  title: string;
  tag: string;
  lane: "todo" | "in-progress" | "done";
}

const INITIAL_TASKS: KanbanTask[] = [
  { id: "t1", title: "Automate 800 catalog validation suite", tag: "Testing", lane: "done" },
  { id: "t2", title: "Design DNA deterministic hash invariants", tag: "Architecture", lane: "done" },
  { id: "t3", title: "Air-gapped private registry export CLI", tag: "Feature", lane: "in-progress" },
  { id: "t4", title: "Figma Variables Synchronizer Bridge", tag: "Design", lane: "todo" },
];

export function ProjectKanbanBoard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [tasks, setTasks] = React.useState(INITIAL_TASKS);

  const moveTask = (id: string, nextLane: KanbanTask["lane"]) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, lane: nextLane } : t)));
  };

  const lanes: { id: KanbanTask["lane"]; label: string }[] = [
    { id: "todo", label: "To Do" },
    { id: "in-progress", label: "In Progress" },
    { id: "done", label: "Done" },
  ];

  return (
    <div className={cn("w-full max-w-5xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Sprint Delivery Board</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {lanes.map((lane) => {
          const laneTasks = tasks.filter((t) => t.lane === lane.id);
          return (
            <div key={lane.id} className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800 font-mono">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">{lane.label}</span>
                <span className="h-5 w-5 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-[10px]">
                  {laneTasks.length}
                </span>
              </div>
              {laneTasks.map((t) => (
                <div key={t.id} className="p-3 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-xs">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                    {t.tag}
                  </span>
                  <div className="font-semibold text-neutral-900 dark:text-white mt-1.5">{t.title}</div>
                  <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-900 flex justify-end gap-1">
                    {lane.id !== "todo" && (
                      <button type="button" onClick={() => moveTask(t.id, "todo")} className="text-[10px] text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                        ←
                      </button>
                    )}
                    {lane.id !== "done" && (
                      <button type="button" onClick={() => moveTask(t.id, "done")} className="text-[10px] text-emerald-500 font-bold">
                        →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
