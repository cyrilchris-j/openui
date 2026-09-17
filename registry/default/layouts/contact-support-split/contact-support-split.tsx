"use client";

import { cn } from "@/lib/cn";

export interface ContactSupportSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  info?: React.ReactNode;
  form?: React.ReactNode;
}

export function ContactSupportSplit({ info, form, className, ...props }: ContactSupportSplitProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="space-y-4">{info}</div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30">{form}</div>
    </div>
  );
}
