"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DnsRecordManagementTable({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const records = [
    { type: "A", host: "@", value: "76.76.21.21", ttl: "3600" },
    { type: "CNAME", host: "www", value: "cname.openui.dev", ttl: "3600" },
    { type: "TXT", host: "_dmarc", value: "v=DMARC1; p=reject;", ttl: "300" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-4">DNS Routing Matrix</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 bg-neutral-50 dark:bg-neutral-900 p-2.5 font-bold text-neutral-400">
          <div className="col-span-2">Type</div>
          <div className="col-span-3">Host</div>
          <div className="col-span-5">Value</div>
          <div className="col-span-2 text-right">TTL</div>
        </div>
        {records.map((r, idx) => (
          <div key={idx} className="grid grid-cols-12 p-2.5 items-center">
            <div className="col-span-2 font-bold text-emerald-600 dark:text-emerald-400">{r.type}</div>
            <div className="col-span-3 text-neutral-900 dark:text-white">{r.host}</div>
            <div className="col-span-5 text-neutral-500 truncate">{r.value}</div>
            <div className="col-span-2 text-right text-neutral-400">{r.ttl}s</div>
          </div>
        ))}
      </div>
    </div>
  );
}
