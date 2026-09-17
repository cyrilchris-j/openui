"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function PasswordGeneratorVault({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [len, setLen] = React.useState(24);

  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-3">Password Vault Generator</h3>
      <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 text-emerald-600 dark:text-emerald-400 font-bold tracking-wider mb-4 break-all">
        8f92a10!eB#k92@LpQ99148b
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-neutral-500">
          <span>Length</span>
          <span>{len} chars</span>
        </div>
        <input
          type="range"
          min="12"
          max="64"
          value={len}
          onChange={(e) => setLen(Number(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer"
        />
      </div>
      <button type="button" className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-bold">
        Copy Password
      </button>
    </div>
  );
}
