"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ActionSheetDialogProps {
  className?: string;
}

export function ActionSheetDialog({ className }: ActionSheetDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-line bg-ink px-4 py-2 font-mono text-xs text-paper shadow"
      >
        Show Action Sheet
      </button>

      {open && (
        <div className="w-64 rounded-xl border border-line bg-paper p-3 shadow-xl space-y-1 font-mono text-xs">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-left rounded p-2 hover:bg-line/20 text-ink"
          >
            Archive File
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-left rounded p-2 hover:bg-red-500/10 text-red-600 font-bold"
          >
            Permanent Delete
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full text-center border-t border-line pt-2 text-ink/50 hover:text-ink"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default ActionSheetDialog;
