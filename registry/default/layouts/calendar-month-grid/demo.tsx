"use client";

import { CalendarMonthGrid } from "./calendar-month-grid";

export default function CalendarMonthGridDemo() {
  return (
    <CalendarMonthGrid>
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="h-16 p-1.5 flex flex-col justify-between text-[11px]">
          <span className="font-semibold text-ink/70">{i + 1}</span>
          {i === 3 && <span className="text-[9px] bg-accent/20 text-accent rounded px-1 truncate">Release</span>}
        </div>
      ))}
    </CalendarMonthGrid>
  );
}
