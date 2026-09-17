"use client";

import { cn } from "@/lib/cn";

export interface StripedHazardWarningProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StripedHazardWarning({ className, children, ...props }: StripedHazardWarningProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-10 -z-10"
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, currentColor, currentColor 20px, transparent 20px, transparent 40px)",
        }}
      />
      {children}
    </div>
  );
}
