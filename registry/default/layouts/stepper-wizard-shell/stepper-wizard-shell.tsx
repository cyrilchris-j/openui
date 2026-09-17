"use client";

import { cn } from "@/lib/cn";

export interface StepperWizardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  stepper?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function StepperWizardShell({ stepper, actions, children, className, ...props }: StepperWizardShellProps) {
  return (
    <div className={cn("max-w-md mx-auto p-6 rounded-2xl border border-line bg-paper text-ink font-sans shadow-sm", className)} {...props}>
      {stepper && <div className="mb-6">{stepper}</div>}
      <div className="mb-6">{children}</div>
      {actions && <div className="pt-4 border-t border-line flex items-center justify-between">{actions}</div>}
    </div>
  );
}
