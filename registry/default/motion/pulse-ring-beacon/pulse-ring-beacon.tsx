"use client";

import { cn } from "@/lib/cn";

export interface PulseRingBeaconProps {
  className?: string;
}

export function PulseRingBeacon({ className }: PulseRingBeaconProps) {
  return (
    <div className={cn("relative flex h-24 w-24 items-center justify-center", className)}>
      <div className="h-4 w-4 rounded-full bg-emerald-500 shadow-sm" />
      <div className="absolute h-12 w-12 rounded-full border border-emerald-500 animate-ping opacity-75" />
      <div className="absolute h-20 w-20 rounded-full border border-emerald-500 animate-ping opacity-40" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

export default PulseRingBeacon;
