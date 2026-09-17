"use client";

import { cn } from "@/lib/cn";

export interface KeycapShortcutRowProps {
  action?: string;
  shortcut?: string[];
  className?: string;
}

export function KeycapShortcutRow({
  action = "Rebuild Registry Index",
  shortcut = ["⌘", "⇧", "R"],
  className,
}: KeycapShortcutRowProps) {
  return (
    <div className={cn("flex w-full max-w-sm items-center justify-between rounded-xl border border-line bg-paper p-3 font-mono text-xs", className)}>
      <span className="text-ink font-semibold">{action}</span>
      <div className="flex gap-1">
        {shortcut.map((k) => (
          <span key={k} className="rounded border border-line bg-line/10 px-2 py-0.5 font-bold text-ink">
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

export default KeycapShortcutRow;
