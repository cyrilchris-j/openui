"use client";

import { cn } from "@/lib/cn";

export interface BadgeNotificationCounterProps {
  count?: number;
  max?: number;
  className?: string;
}

export function BadgeNotificationCounter({
  count = 28,
  max = 99,
  className,
}: BadgeNotificationCounterProps) {
  const display = count > max ? `${max}+` : count;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-red-500 px-2 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm",
        className
      )}
    >
      {display}
    </span>
  );
}

export default BadgeNotificationCounter;
