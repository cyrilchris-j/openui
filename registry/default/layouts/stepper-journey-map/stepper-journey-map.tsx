"use client";

import { cn } from "@/lib/cn";

export interface StepperJourneyMapProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function StepperJourneyMap({ children, className, ...props }: StepperJourneyMapProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-4 p-4 max-w-5xl mx-auto font-sans text-xs", className)} {...props}>
      {children}
    </div>
  );
}
