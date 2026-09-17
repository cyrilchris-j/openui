"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function NotificationsCenterDrawer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [unreadCount, setUnreadCount] = React.useState(2);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-xs", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 font-bold text-neutral-900 dark:text-white">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono">
              {unreadCount}
            </span>
          )}
        </div>
        <button type="button" onClick={() => setUnreadCount(0)} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-[11px]">
          Mark all read
        </button>
      </div>

      <div className="divide-y divide-neutral-100 dark:divide-neutral-800 mt-2">
        <div className="py-3">
          <div className="font-semibold text-neutral-900 dark:text-white">Release v2.4.0 verified</div>
          <div className="text-neutral-500 mt-0.5">800 open-source primitives are now live in the registry.</div>
          <div className="text-[10px] text-neutral-400 mt-1 font-mono">5m ago</div>
        </div>
        <div className="py-3">
          <div className="font-semibold text-neutral-900 dark:text-white">Security audit completed</div>
          <div className="text-neutral-500 mt-0.5">Zero vulnerabilities detected in automated scanning.</div>
          <div className="text-[10px] text-neutral-400 mt-1 font-mono">1h ago</div>
        </div>
      </div>
    </div>
  );
}
