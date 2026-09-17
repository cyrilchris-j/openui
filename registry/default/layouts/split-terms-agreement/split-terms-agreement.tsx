"use client";

import { cn } from "@/lib/cn";

export interface SplitTermsAgreementProps extends React.HTMLAttributes<HTMLDivElement> {
  terms?: React.ReactNode;
  consent?: React.ReactNode;
}

export function SplitTermsAgreement({ terms, consent, className, ...props }: SplitTermsAgreementProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto p-6 rounded-2xl border border-line bg-paper font-sans text-xs items-start shadow-sm", className)} {...props}>
      <div className="md:col-span-8 h-48 overflow-y-auto pr-4 space-y-2 border-r border-line">{terms}</div>
      <div className="md:col-span-4 space-y-4">{consent}</div>
    </div>
  );
}
