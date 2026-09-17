"use client";

import { cn } from "@/lib/cn";

export interface OrbitRingSpinnerProps {
  size?: number;
  className?: string;
}

export function OrbitRingSpinner({ size = 72, className }: OrbitRingSpinnerProps) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-ink/20 border-t-ink animate-spin" />
      {/* Middle Ring */}
      <div
        className="absolute inset-2 rounded-full border-2 border-ink/20 border-b-ink animate-spin"
        style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
      />
      {/* Inner Ring */}
      <div
        className="absolute inset-4 rounded-full border-2 border-ink/20 border-l-ink animate-spin"
        style={{ animationDuration: "0.8s" }}
      />
    </div>
  );
}

export default OrbitRingSpinner;
