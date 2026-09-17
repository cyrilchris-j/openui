"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticStepperDotsProps {
  total?: number;
  className?: string;
}

export function ElasticStepperDots({ total = 5, className }: ElasticStepperDotsProps) {
  const [current, setCurrent] = useState(0);

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              i === current ? "w-8 bg-ink" : "w-2.5 bg-line hover:bg-ink/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default ElasticStepperDots;
