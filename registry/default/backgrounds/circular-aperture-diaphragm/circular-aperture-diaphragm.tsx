"use client";

import { cn } from "@/lib/cn";

export interface CircularApertureDiaphragmProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CircularApertureDiaphragm({ className, children, ...props }: CircularApertureDiaphragmProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1.5" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="15"
              x2="160"
              y2="135"
              stroke="currentColor"
              strokeWidth="1"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
        </svg>
      </div>
      {children}
    </div>
  );
}
