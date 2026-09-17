"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticFabMenuProps {
  className?: string;
}

export function ElasticFabMenu({ className }: ElasticFabMenuProps) {
  const [open, setOpen] = useState(false);
  const actions = ["✎", "📎", "★"];

  return (
    <div className={cn("relative h-64 w-full max-w-sm rounded-xl border border-line bg-paper p-6", className)}>
      <div className="absolute bottom-6 right-6 flex flex-col-reverse items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full bg-ink text-xl text-paper shadow-xl transition-transform duration-300",
            open ? "rotate-45" : "rotate-0"
          )}
        >
          +
        </button>

        {actions.map((act, i) => (
          <button
            key={i}
            type="button"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-sm text-ink shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              open ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-8"
            )}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {act}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ElasticFabMenu;
