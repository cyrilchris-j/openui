"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DatabaseQueryRunner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [query, setQuery] = React.useState("SELECT name, category, status FROM registry_items LIMIT 3;");

  const results = [
    { name: "SplitHeadlineHero", category: "sections", status: "verified" },
    { name: "MagneticButton", category: "interactions", status: "verified" },
    { name: "HolyGrailLayout", category: "layouts", status: "verified" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
        <span className="text-white font-bold">PostgreSQL Console (Isolate Pool)</span>
        <span className="text-emerald-400">0.8ms query time</span>
      </div>
      <div className="p-3 bg-neutral-900 rounded border border-neutral-800 text-neutral-300 mb-3">
        {query}
      </div>
      <div className="border border-neutral-800 rounded overflow-hidden">
        <div className="grid grid-cols-3 bg-neutral-900 p-2 font-bold text-neutral-400">
          <div>name</div>
          <div>category</div>
          <div>status</div>
        </div>
        <div className="divide-y divide-neutral-800">
          {results.map((r) => (
            <div key={r.name} className="grid grid-cols-3 p-2 text-neutral-200">
              <div>{r.name}</div>
              <div>{r.category}</div>
              <div className="text-emerald-400">{r.status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
