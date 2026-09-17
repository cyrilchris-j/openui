"use client";

import { cn } from "@/lib/cn";

export interface OnboardingFlowShellProps extends React.HTMLAttributes<HTMLDivElement> {
  stepIndicator?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function OnboardingFlowShell({
  stepIndicator,
  actions,
  children,
  className,
  ...props
}: OnboardingFlowShellProps) {
  return (
    <div className={cn("max-w-md mx-auto p-8 rounded-3xl border border-line bg-paper text-ink font-sans shadow-xl text-center space-y-6", className)} {...props}>
      <div className="flex justify-center">{stepIndicator}</div>
      <div>{children}</div>
      <div className="pt-4 border-t border-line">{actions}</div>
    </div>
  );
}
