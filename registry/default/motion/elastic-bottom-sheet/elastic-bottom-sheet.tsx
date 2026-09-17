"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticBottomSheetProps {
  className?: string;
}

export function ElasticBottomSheet({ className }: ElasticBottomSheetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative h-96 w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-line/10", className)}>
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="rounded-lg bg-ink px-4 py-2 font-medium text-paper shadow-sm hover:opacity-90"
        >
          Open Sheet
        </button>
      </div>

      {/* Sheet Container */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-line bg-paper p-6 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="mx-auto h-1.5 w-12 rounded-full bg-ink/20 mb-4" />
        <div className="flex items-center justify-between pb-3 border-b border-line">
          <h4 className="font-display font-semibold text-ink">Action Panel</h4>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="font-mono text-xs text-ink/60 hover:text-ink"
          >
            Done
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink/70">
          The sheet locks into distinct resting snap heights and springs closed when swiped downward.
        </p>
      </div>
    </div>
  );
}

export default ElasticBottomSheet;
