"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function LegalComplianceFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("w-full border-t border-neutral-200 dark:border-neutral-800 py-6 px-4 text-center text-xs text-neutral-500 bg-white dark:bg-neutral-950", className)} {...props}>
      <div>OpenUI Registry • Licensed under MIT • Zero Tracking Cookies</div>
    </footer>
  );
}
