"use client";

import { cn } from "@/lib/cn";

export interface StatusTelemetryDotProps {
  label?: string;
  className?: string;
}

export function StatusTelemetryDot({
  label = "Cluster Operational",
  className,
}: StatusTelemetryDotProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 font-mono text-xs font-bold text-ink", className)}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>{label}</span>
    </div>
  );
}

export default StatusTelemetryDot;
