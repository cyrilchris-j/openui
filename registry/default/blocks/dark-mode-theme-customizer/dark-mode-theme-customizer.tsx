"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DarkModeThemeCustomizer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [hue, setHue] = React.useState(160);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">HSL Theme Customizer</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-neutral-500 mb-1">
            <span>Primary Brand Hue</span>
            <span className="font-bold">{hue}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>
        <div
          className="h-14 rounded-xl flex items-center justify-center font-bold text-white"
          style={{ backgroundColor: `hsl(${hue}, 80%, 40%)` }}
        >
          Active Accent Preview
        </div>
      </div>
    </div>
  );
}
