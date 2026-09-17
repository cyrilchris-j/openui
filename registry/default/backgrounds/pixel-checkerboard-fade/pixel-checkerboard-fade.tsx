"use client";

import { cn } from "@/lib/cn";

export interface PixelCheckerboardFadeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function PixelCheckerboardFade({ className, children, ...props }: PixelCheckerboardFadeProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-10 -z-10"
        style={{
          backgroundImage: "repeating-conic-gradient(currentColor 0% 25%, transparent 0% 50%)",
          backgroundSize: "16px 16px",
        }}
      />
      {children}
    </div>
  );
}
