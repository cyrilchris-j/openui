"use client";

import { cn } from "@/lib/cn";

export interface HalftoneCircularBurstProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function HalftoneCircularBurst({ className, children, ...props }: HalftoneCircularBurstProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 -z-10">
        <svg className="w-[500px] h-[500px]" viewBox="0 0 200 200">
          {[20, 35, 50, 65, 80].map((r, ringIdx) => {
            const dots = 12 + ringIdx * 6;
            return Array.from({ length: dots }).map((_, dotIdx) => {
              const angle = (dotIdx / dots) * Math.PI * 2;
              const x = 100 + r * Math.cos(angle);
              const y = 100 + r * Math.sin(angle);
              return <circle key={`${ringIdx}-${dotIdx}`} cx={x} cy={y} r={ringIdx * 0.6 + 1} fill="currentColor" />;
            });
          })}
        </svg>
      </div>
      {children}
    </div>
  );
}
