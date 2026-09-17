"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function RealtimeChatWidget({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-xs", className)} {...props}>
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3">
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <div>
          <div className="font-bold text-neutral-900 dark:text-white">OpenUI Support Desk</div>
          <div className="text-neutral-400 text-[10px]">Active now • Avg reply 2m</div>
        </div>
      </div>
      <div className="h-36 overflow-y-auto space-y-2 p-1">
        <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
          Hi! How can we assist with your component configuration?
        </div>
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        className="w-full mt-2 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
      />
    </div>
  );
}
