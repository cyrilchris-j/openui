"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeviceSessionManager({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [sessions, setSessions] = React.useState([
    { id: "s1", device: "MacBook Pro (Chrome 128)", ip: "192.0.2.1", location: "San Francisco, US", current: true },
    { id: "s2", device: "iPhone 16 Pro (Safari Mobile)", ip: "198.51.100.4", location: "San Francisco, US", current: false },
  ]);

  const revoke = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Active Device Sessions</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {sessions.map((s) => (
          <div key={s.id} className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900 dark:text-white">{s.device}</span>
                {s.current && <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">This Device</span>}
              </div>
              <div className="text-neutral-400 text-[11px] mt-0.5">{s.location} • IP: {s.ip}</div>
            </div>
            {!s.current && (
              <button type="button" onClick={() => revoke(s.id)} className="text-rose-500 hover:underline font-semibold">
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
