"use client";

import { cn } from "@/lib/cn";

export interface DotMatrixGridProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: number;
  dotSize?: number;
  dotColor?: string;
  children?: React.ReactNode;
}

export function DotMatrixGrid({
  spacing = 24,
  dotSize = 1.5,
  dotColor = "currentColor",
  className,
  children,
  ...props
}: DotMatrixGridProps) {
  return (
    <div
      className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)}
      {...props}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-20 -z-10"
        style={{
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
        }}
      />
      {children}
    </div>
  );
}
