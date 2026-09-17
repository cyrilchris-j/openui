"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RubberbandElasticToggleProps {
  className?: string;
}

export function RubberbandElasticToggle({ className }: RubberbandElasticToggleProps) {
  const [active, setActive] = useState(false);

  return (
    <div className={cn("inline-flex items-center gap-4 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">AUTOSCALE PODS</span>
      <div
        onClick={() => setActive((a) => !a)}
        className={cn(
          "relative h-8 w-16 cursor-pointer rounded-full border border-line p-1 transition-colors duration-200",
          active ? "bg-ink border-ink" : "bg-line/20"
        )}
      >
        <div
          className={cn(
            "h-6 w-6 rounded-full bg-paper shadow-md transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            active ? "translate-x-8" : "translate-x-0"
          )}
        />
      </div>
    </div>
  );
}

export default RubberbandElasticToggle;
