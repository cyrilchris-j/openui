"use client";

import { cn } from "@/lib/cn";

export interface ThreeColumnSocialDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export function ThreeColumnSocialDashboard({ left, center, right, className, ...props }: ThreeColumnSocialDashboardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-4 max-w-5xl mx-auto p-4 font-sans items-start", className)} {...props}>
      <div className="md:col-span-3 hidden md:block">{left}</div>
      <div className="md:col-span-6 space-y-4">{center}</div>
      <div className="md:col-span-3 hidden lg:block">{right}</div>
    </div>
  );
}
