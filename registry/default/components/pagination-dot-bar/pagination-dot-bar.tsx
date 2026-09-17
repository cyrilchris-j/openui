"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PaginationDotBarProps {
  total?: number;
  className?: string;
}

export function PaginationDotBar({ total = 4, className }: PaginationDotBarProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setActive(i)}
          className={cn(
            "h-2 rounded-full transition-all duration-200",
            active === i ? "w-6 bg-ink" : "w-2 bg-line hover:bg-ink/50"
          )}
        />
      ))}
    </div>
  );
}

export default PaginationDotBar;
