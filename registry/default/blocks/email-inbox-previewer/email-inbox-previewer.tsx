"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function EmailInboxPreviewer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [active, setActive] = React.useState(0);

  const emails = [
    { from: "Marcus Vance", subject: "Verification suite completed", body: "All 800 items verified with 0 typescript errors." },
    { from: "Elena Rostova", subject: "Design DNA tokens updated", body: "Checked mathematical token consistency across themes." },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 space-y-2">
          {emails.map((m, idx) => (
            <div
              key={idx}
              onClick={() => setActive(idx)}
              className={cn(
                "p-3 rounded-xl border cursor-pointer transition-colors",
                active === idx ? "border-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/20" : "border-neutral-200 dark:border-neutral-800"
              )}
            >
              <div className="font-bold text-neutral-900 dark:text-white">{m.from}</div>
              <div className="text-neutral-500 truncate mt-0.5">{m.subject}</div>
            </div>
          ))}
        </div>
        <div className="md:col-span-7 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
          <div className="font-bold text-sm text-neutral-900 dark:text-white mb-2">{emails[active]?.subject}</div>
          <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{emails[active]?.body}</div>
        </div>
      </div>
    </div>
  );
}
