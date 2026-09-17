"use client";

import { cn } from "@/lib/cn";

export interface InfiniteTunnelRingsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function InfiniteTunnelRings({ className, children, ...props }: InfiniteTunnelRingsProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          {[10, 25, 45, 70, 95].map((s) => (
            <rect
              key={s}
              x={100 - s}
              y={100 - s}
              width={s * 2}
              height={s * 2}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
          <line x1="5" y1="5" x2="90" y2="90" stroke="currentColor" strokeWidth="0.75" />
          <line x1="195" y1="5" x2="110" y2="90" stroke="currentColor" strokeWidth="0.75" />
          <line x1="5" y1="195" x2="90" y2="110" stroke="currentColor" strokeWidth="0.75" />
          <line x1="195" y1="195" x2="110" y2="110" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>
      {children}
    </div>
  );
}
