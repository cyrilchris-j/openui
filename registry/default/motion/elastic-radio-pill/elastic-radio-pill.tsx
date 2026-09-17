"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticRadioPillProps {
  options?: string[];
  className?: string;
}

export function ElasticRadioPill({
  options = ["Daily", "Weekly", "Monthly", "Yearly"],
  className,
}: ElasticRadioPillProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className={cn("inline-flex rounded-full border border-line bg-line/20 p-1", className)}>
      <div className="relative flex">
        {options.map((opt, idx) => (
          <button
            key={opt}
            type="button"
            onClick={() => setSelected(idx)}
            className={cn(
              "relative z-10 px-4 py-1.5 font-mono text-xs font-medium transition-colors duration-200",
              selected === idx ? "text-paper" : "text-ink/60 hover:text-ink"
            )}
          >
            {opt}
          </button>
        ))}

        <div
          className="absolute inset-y-0 rounded-full bg-ink transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            width: `${100 / options.length}%`,
            left: `${(selected * 100) / options.length}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ElasticRadioPill;
