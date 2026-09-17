"use client";

import { cn } from "@/lib/cn";

export interface BreadcrumbsSlashTrailProps {
  items?: string[];
  className?: string;
}

export function BreadcrumbsSlashTrail({
  items = ["Registry", "Components", "Breadcrumbs"],
  className,
}: BreadcrumbsSlashTrailProps) {
  return (
    <nav className={cn("flex items-center gap-2 font-mono text-xs", className)}>
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <div key={item} className="flex items-center gap-2">
            <span className={cn(isLast ? "font-bold text-ink" : "text-ink/60 hover:text-ink cursor-pointer")}>
              {item}
            </span>
            {!isLast && <span className="text-ink/40">/</span>}
          </div>
        );
      })}
    </nav>
  );
}

export default BreadcrumbsSlashTrail;
