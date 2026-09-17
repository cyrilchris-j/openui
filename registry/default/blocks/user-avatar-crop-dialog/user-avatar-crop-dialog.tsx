"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function UserAvatarCropDialog({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [zoom, setZoom] = React.useState(100);

  return (
    <div className={cn("w-full max-w-sm mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-center text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Adjust Profile Photo</h3>
      <div className="h-32 w-32 mx-auto rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-mono text-neutral-400 mb-4 overflow-hidden">
        <span style={{ transform: `scale(${zoom / 100})` }} className="transition-transform font-bold text-2xl">
          👤
        </span>
      </div>
      <div className="space-y-1 mb-6">
        <div className="flex justify-between text-neutral-500 font-mono text-[11px]">
          <span>Zoom</span>
          <span>{zoom}%</span>
        </div>
        <input
          type="range"
          min="100"
          max="200"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer"
        />
      </div>
      <button type="button" className="w-full py-2 bg-emerald-600 text-white rounded-lg font-semibold">
        Save Avatar
      </button>
    </div>
  );
}
