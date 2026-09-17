"use client";

import { cn } from "@/lib/cn";

export interface AbstractGeometricMandalaProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function AbstractGeometricMandala({ className, children, ...props }: AbstractGeometricMandalaProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="1" />
          {[0, 30, 60, 90, 120, 150].map((deg) => (
            <rect
              key={deg}
              x="50"
              y="50"
              width="100"
              height="100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
              transform={`rotate(${deg} 100 100)`}
            />
          ))}
          <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      {children}
    </div>
  );
}
