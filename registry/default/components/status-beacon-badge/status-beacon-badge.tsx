"use client";

import { cn } from "@/lib/cn";

export interface StatusBeaconBadgeProps {
  label?: string;
  status?: "healthy" | "degraded" | "down";
  className?: string;
}

export function StatusBeaconBadge({
  label = "API Cluster Live",
  status = "healthy",
  className,
}: StatusBeaconBadgeProps) {
  const colorMap = {
    healthy: "bg-emerald-500",
    degraded: "bg-amber-500",
    down: "bg-red-500",
  };

  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-xs font-bold text-ink shadow-sm", className)}>
      <span className="relative flex h-2.5 w-2.5">
        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping", colorMap[status])} />
        <span className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", colorMap[status])} />
      </span>
      <span>{label}</span>
    </div>
  );
}

export default StatusBeaconBadge;
