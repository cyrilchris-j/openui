"use client";

import { cn } from "@/lib/cn";

export interface EcommerceProductStageProps extends React.HTMLAttributes<HTMLDivElement> {
  gallery?: React.ReactNode;
  details?: React.ReactNode;
}

export function EcommerceProductStage({ gallery, details, className, ...props }: EcommerceProductStageProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="lg:col-span-7">{gallery}</div>
      <div className="lg:col-span-5 space-y-4">{details}</div>
    </div>
  );
}
