"use client";

import { cn } from "@/lib/cn";

export interface ShimmerSkeletonLoaderProps {
  className?: string;
}

export function ShimmerSkeletonLoader({ className }: ShimmerSkeletonLoaderProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 space-y-4 shadow-sm", className)}>
      <div className="h-6 w-3/4 rounded bg-line/40 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-paper/60 to-transparent" />
      </div>
      <div className="h-4 w-full rounded bg-line/30 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-paper/60 to-transparent" />
      </div>
      <div className="h-4 w-5/6 rounded bg-line/30 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-paper/60 to-transparent" />
      </div>
    </div>
  );
}

export default ShimmerSkeletonLoader;
