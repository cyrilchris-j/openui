"use client";

import { cn } from "@/lib/cn";

export interface BadgeTagCloudProps {
  className?: string;
}

export function BadgeTagCloud({ className }: BadgeTagCloudProps) {
  const tags = ["TypeScript", "Next.js", "Vite", "React 19", "Tailwind", "CSS"];

  return (
    <div className={cn("flex flex-wrap gap-1.5 max-w-xs", className)}>
      {tags.map((t) => (
        <span key={t} className="rounded-full border border-line bg-paper px-2.5 py-0.5 font-mono text-[10px] text-ink">
          {t}
        </span>
      ))}
    </div>
  );
}

export default BadgeTagCloud;
