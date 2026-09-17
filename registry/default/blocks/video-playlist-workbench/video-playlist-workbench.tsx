"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function VideoPlaylistWorkbench({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [active, setActive] = React.useState(0);

  const playlist = [
    { title: "1. Core Philosophy of Design DNA", duration: "12m" },
    { title: "2. Setting Up Zero-Dependency Primitives", duration: "18m" },
    { title: "3. Verifying Schema with pnpm validate", duration: "14m" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 bg-neutral-900 text-white rounded-xl h-56 flex items-center justify-center font-mono">
          [Playing: {playlist[active]?.title}]
        </div>
        <div className="md:col-span-4 space-y-2">
          <div className="font-bold text-neutral-900 dark:text-white mb-2">Tutorial Series</div>
          {playlist.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActive(idx)}
              className={cn(
                "p-3 rounded-lg border cursor-pointer transition-colors",
                active === idx ? "border-emerald-600 bg-emerald-50/20 dark:bg-emerald-950/20 font-bold" : "border-neutral-200 dark:border-neutral-800"
              )}
            >
              <div>{item.title}</div>
              <div className="text-neutral-400 text-[10px] mt-1">{item.duration}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
