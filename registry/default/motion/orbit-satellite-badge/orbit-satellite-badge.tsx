"use client";

import { cn } from "@/lib/cn";

export interface OrbitSatelliteBadgeProps {
  className?: string;
}

export function OrbitSatelliteBadge({ className }: OrbitSatelliteBadgeProps) {
  return (
    <div className={cn("relative flex h-24 w-24 items-center justify-center rounded-xl border border-line bg-paper p-4", className)}>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper font-mono text-sm font-bold shadow">
        UI
      </div>
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
        <div className="absolute top-0 left-1/2 -ml-2 -mt-2 h-4 w-4 rounded-full bg-red-500 shadow-md" />
      </div>
    </div>
  );
}

export default OrbitSatelliteBadge;
