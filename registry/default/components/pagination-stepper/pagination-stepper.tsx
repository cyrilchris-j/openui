"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PaginationStepperProps {
  totalPages?: number;
  className?: string;
}

export function PaginationStepper({ totalPages = 8, className }: PaginationStepperProps) {
  const [page, setPage] = useState(1);

  return (
    <div className={cn("inline-flex items-center gap-2 rounded-xl border border-line bg-paper p-2 shadow-sm font-mono text-xs", className)}>
      <button
        type="button"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        className="rounded px-2.5 py-1 border border-line hover:bg-line/20 disabled:opacity-30"
      >
        Prev
      </button>

      <span className="px-3 font-bold text-ink">
        {page} / {totalPages}
      </span>

      <button
        type="button"
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        className="rounded px-2.5 py-1 border border-line hover:bg-line/20 disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationStepper;
