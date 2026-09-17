"use client";

import { cn } from "@/lib/cn";

export interface SoundFrequencySpectrogramProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function SoundFrequencySpectrogram({ className, children, ...props }: SoundFrequencySpectrogramProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-25 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 0%, #10b981 30%, #f59e0b 60%, #ef4444 100%),
            repeating-linear-gradient(to bottom, transparent, transparent 3px, rgba(0,0,0,0.8) 3px, rgba(0,0,0,0.8) 5px)
          `,
          backgroundBlendMode: "multiply",
        }}
      />
      {children}
    </div>
  );
}
