"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function AudioTrackPlayerWidget({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [playing, setPlaying] = React.useState(false);

  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg text-xs", className)} {...props}>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-xl font-bold">
          ♫
        </div>
        <div>
          <h4 className="font-bold text-neutral-900 dark:text-white">Podcast: The Zero-Bundle Web</h4>
          <div className="text-neutral-400 text-[11px]">Elena Rostova • Episode 42</div>
        </div>
      </div>

      <div className="h-8 rounded bg-neutral-100 dark:bg-neutral-900 flex items-center px-3 font-mono text-[10px] text-neutral-400 justify-between mb-4">
        <span>02:14</span>
        <span>||||||||||||||||||||||||||||||||</span>
        <span>48:00</span>
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => setPlaying(!playing)}
          className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm"
        >
          {playing ? "❚❚" : "▶"}
        </button>
      </div>
    </div>
  );
}
