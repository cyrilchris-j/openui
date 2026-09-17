"use client";

import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

export interface DiffInlineBadgeProps {
  additions?: number;
  deletions?: number;
  className?: string;
}

export function DiffInlineBadge({
  additions = 142,
  deletions = 38,
  className,
}: DiffInlineBadgeProps) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 font-mono text-xs", className)}>
      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 font-semibold">
        <Plus className="w-3 h-3" />
        {additions}
      </span>
      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-red-500/15 text-red-600 font-semibold">
        <Minus className="w-3 h-3" />
        {deletions}
      </span>
    </div>
  );
}
