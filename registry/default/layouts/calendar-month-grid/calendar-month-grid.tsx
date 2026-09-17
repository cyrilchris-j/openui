"use client";

import { cn } from "@/lib/cn";

export interface CalendarMonthGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CalendarMonthGrid({ children, className, ...props }: CalendarMonthGridProps) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className={cn("max-w-2xl mx-auto border border-line rounded-xl overflow-hidden font-mono text-xs", className)} {...props}>
      <div className="grid grid-cols-7 border-b border-line bg-surface/40 text-center font-bold py-2">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 divide-x divide-y divide-line/60 bg-paper">{children}</div>
    </div>
  );
}
