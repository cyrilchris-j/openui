"use client";

import { cn } from "@/lib/cn";

export interface TimelineEventCardProps {
  title?: string;
  author?: string;
  time?: string;
  commitHash?: string;
  className?: string;
}

export function TimelineEventCard({
  title = "Published Registry Index V2",
  author = "cyrilchris-j",
  time = "10m ago",
  commitHash = "8fa21c0",
  className,
}: TimelineEventCardProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between items-center text-ink/50 text-[10px]">
        <span>{time}</span>
        <span className="rounded bg-line/20 px-1.5 py-0.5">{commitHash}</span>
      </div>
      <h5 className="font-bold text-ink mt-2">{title}</h5>
      <p className="mt-1 text-ink/70">Authored by {author}</p>
    </div>
  );
}

export default TimelineEventCard;
