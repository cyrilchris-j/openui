"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ToggleSwitchCardProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ToggleSwitchCard({
  title = "Telemetry Broadcast",
  description = "Share anonymous build performance metrics",
  className,
}: ToggleSwitchCardProps) {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className={cn("flex w-full max-w-sm items-center justify-between rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="pr-4">
        <h5 className="font-display text-sm font-bold text-ink">{title}</h5>
        <p className="mt-0.5 font-mono text-[10px] text-ink/60">{description}</p>
      </div>

      <div
        onClick={() => setEnabled((e) => !e)}
        className={cn(
          "relative h-6 w-11 cursor-pointer rounded-full border border-line p-0.5 transition-colors",
          enabled ? "bg-ink" : "bg-line/20"
        )}
      >
        <div
          className={cn(
            "h-5 w-5 rounded-full bg-paper shadow-sm transition-transform duration-200",
            enabled ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>
    </div>
  );
}

export default ToggleSwitchCard;
