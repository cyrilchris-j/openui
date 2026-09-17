"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardFocusTrapModalProps {
  className?: string;
}

export function KeyboardFocusTrapModal({ className }: KeyboardFocusTrapModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded border border-line bg-ink px-4 py-2 font-mono text-xs text-paper shadow"
      >
        Open Focus Trap Dialog
      </button>

      {open && (
        <div className="rounded-xl border border-line bg-paper p-6 shadow-xl w-72 space-y-3">
          <h4 className="font-mono text-xs font-bold text-ink">Focus Trapped Scope</h4>
          <input
            type="text"
            placeholder="Field A"
            className="w-full rounded border border-line p-1 font-mono text-xs"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full rounded bg-ink py-1 font-mono text-xs text-paper"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default KeyboardFocusTrapModal;
