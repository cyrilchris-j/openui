"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardShortcutMatrixProps {
  className?: string;
}

export function KeyboardShortcutMatrix({ className }: KeyboardShortcutMatrixProps) {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const keys = ["⌘", "K", "⇧", "P", "⌥", "⏎"];

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">KEYBOARD SHORTCUT MATRIX</span>

      <div className="flex gap-2">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setActiveKey(k)}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-lg border font-mono text-sm font-bold shadow-sm transition-all select-none active:scale-95",
              activeKey === k
                ? "border-ink bg-ink text-paper -translate-y-0.5 shadow-md"
                : "border-line bg-line/10 text-ink hover:border-ink"
            )}
          >
            {k}
          </button>
        ))}
      </div>

      <p className="font-mono text-[10px] text-ink/40">
        {activeKey ? `Triggered Hotkey: ${activeKey}` : "Click keycaps to trigger"}
      </p>
    </div>
  );
}

export default KeyboardShortcutMatrix;
