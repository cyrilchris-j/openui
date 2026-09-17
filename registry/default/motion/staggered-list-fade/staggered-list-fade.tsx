"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface StaggeredListFadeProps {
  className?: string;
}

export function StaggeredListFade({ className }: StaggeredListFadeProps) {
  const [visible, setVisible] = useState(true);
  const items = ["Production Cluster Alpha", "Replica Set Frankfurt", "Edge CDN Workers", "Database Secondary"];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-5 shadow-sm", className)}>
      <div className="flex justify-between items-center pb-3 border-b border-line mb-3">
        <span className="font-mono text-xs text-ink/60">INFRASTRUCTURE</span>
        <button
          type="button"
          onClick={() => {
            setVisible(false);
            setTimeout(() => setVisible(true), 150);
          }}
          className="font-mono text-[10px] text-ink hover:underline"
        >
          Reload
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => (
          <div
            key={item}
            className={cn(
              "rounded-lg border border-line bg-line/10 p-3 font-mono text-xs text-ink transition-all duration-300",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            )}
            style={{ transitionDelay: `${idx * 60}ms` }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaggeredListFade;
