"use client";

import { cn } from "@/lib/cn";

export interface BadgeTagStripProps {
  tags?: string[];
  className?: string;
}

export function BadgeTagStrip({
  tags = ["TypeScript", "React 19", "Tailwind", "Design DNA"],
  className,
}: BadgeTagStripProps) {
  return (
    <div className={cn("inline-flex flex-wrap gap-1.5", className)}>
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-line bg-line/10 px-3 py-0.5 font-mono text-[10px] font-semibold text-ink"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default BadgeTagStrip;
