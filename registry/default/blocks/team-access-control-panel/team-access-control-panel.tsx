"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface Member {
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Editor" | "Viewer";
}

const MEMBERS: Member[] = [
  { name: "Cyril Chris", email: "cyril@openui.dev", role: "Owner" },
  { name: "Elena Rostova", email: "elena@openui.dev", role: "Admin" },
  { name: "Marcus Vance", email: "marcus@openui.dev", role: "Editor" },
];

export function TeamAccessControlPanel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">Workspace Members</h3>
          <p className="text-neutral-500 mt-0.5">Control team access and permissions.</p>
        </div>
        <button type="button" className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold">
          Invite Member
        </button>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800 mt-2">
        {MEMBERS.map((m) => (
          <div key={m.email} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-semibold text-neutral-900 dark:text-white">{m.name}</div>
              <div className="text-neutral-500 text-[11px]">{m.email}</div>
            </div>
            <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {m.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
