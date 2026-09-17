"use client";

import { cn } from "@/lib/cn";

export interface BayerMatrixDitherProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function BayerMatrixDither({ className, children, ...props }: BayerMatrixDitherProps) {
  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <div
        className="absolute inset-0 pointer-events-none opacity-10 -z-10"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "8px 8px",
          backgroundPosition: "0 0, 4px 4px",
        }}
      />
      {children}
    </div>
  );
}
