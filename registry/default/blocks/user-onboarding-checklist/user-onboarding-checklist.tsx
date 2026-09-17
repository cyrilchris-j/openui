"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function UserOnboardingChecklist({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [items, setItems] = React.useState([
    { id: "1", title: "Install OpenUI CLI globally", done: true },
    { id: "2", title: "Add first component to local src/", done: true },
    { id: "3", title: "Configure Design DNA invariants in openui.config.ts", done: false },
    { id: "4", title: "Verify build passes 'pnpm validate:catalog'", done: false },
  ]);

  const toggle = (id: string) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
  };

  const completed = items.filter((it) => it.done).length;
  const percent = Math.round((completed / items.length) * 100);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-base text-neutral-900 dark:text-white">Workspace Onboarding</h3>
        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{percent}% Done</span>
      </div>
      <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 mb-6 overflow-hidden">
        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${percent}%` }} />
      </div>
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} onClick={() => toggle(it.id)} className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
            <span className={cn("h-5 w-5 rounded-full flex items-center justify-center font-bold text-[10px]", it.done ? "bg-emerald-600 text-white" : "border border-neutral-300 dark:border-neutral-700")}>
              {it.done ? "✓" : ""}
            </span>
            <span className={cn(it.done ? "line-through text-neutral-400" : "font-medium text-neutral-800 dark:text-neutral-200")}>
              {it.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
