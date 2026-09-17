"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CollapsibleSectionCardProps {
  title?: string;
  className?: string;
}

export function CollapsibleSectionCard({
  title = "Security & Access Policies",
  className,
}: CollapsibleSectionCardProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper overflow-hidden shadow-sm", className)}>
      <div
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-line/10 transition-colors font-display text-sm font-bold text-ink"
      >
        <span>{title}</span>
        <span className="font-mono text-xs">{collapsed ? "▼" : "▲"}</span>
      </div>

      {!collapsed && (
        <div className="border-t border-line p-4 font-mono text-xs text-ink/70 leading-relaxed">
          Cryptographic token signing enforced across all edge worker requests. Mutual TLS enabled on upstream endpoints.
        </div>
      )}
    </div>
  );
}

export default CollapsibleSectionCard;
