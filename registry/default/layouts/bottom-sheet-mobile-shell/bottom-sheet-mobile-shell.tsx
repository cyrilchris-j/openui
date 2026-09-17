"use client";

import { cn } from "@/lib/cn";

export interface BottomSheetMobileShellProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  sheet?: React.ReactNode;
  children?: React.ReactNode;
}

export function BottomSheetMobileShell({
  header,
  sheet,
  children,
  className,
  ...props
}: BottomSheetMobileShellProps) {
  return (
    <div className={cn("max-w-xs mx-auto h-[480px] border border-line rounded-3xl overflow-hidden flex flex-col relative bg-paper text-ink font-sans shadow-lg", className)} {...props}>
      {header && <div className="p-3 border-b border-line shrink-0 bg-surface/30 font-bold text-xs">{header}</div>}
      <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      {sheet && (
        <div className="border-t border-line p-4 rounded-t-2xl bg-surface/90 backdrop-blur-md shadow-md shrink-0">
          <div className="w-8 h-1 bg-line rounded-full mx-auto mb-3" />
          {sheet}
        </div>
      )}
    </div>
  );
}
