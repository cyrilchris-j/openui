"use client";

import { cn } from "@/lib/cn";

export interface SoundwaveEqualizerBarsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SoundwaveEqualizerBars({ className, children, ...props }: SoundwaveEqualizerBarsProps) {
  const bars = [25, 45, 60, 85, 95, 70, 50, 40, 65, 80, 55, 30, 45, 75, 90, 60, 40, 25, 35, 55];

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div className="absolute inset-x-0 bottom-0 h-32 flex items-end justify-center gap-1.5 px-6 pointer-events-none opacity-15 -z-10">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-currentColor rounded-t-sm"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
