"use client";

import { cn } from "@/lib/cn";

export interface MultiPaneChatLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  channels?: React.ReactNode;
  messages?: React.ReactNode;
  members?: React.ReactNode;
}

export function MultiPaneChatLayout({ channels, messages, members, className, ...props }: MultiPaneChatLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 min-h-[380px] w-full border border-line rounded-2xl overflow-hidden font-sans text-xs", className)} {...props}>
      <div className="md:col-span-3 border-r border-line p-3 bg-surface/30 hidden md:block">{channels}</div>
      <div className="md:col-span-6 p-4 flex flex-col justify-between bg-paper">{messages}</div>
      <div className="md:col-span-3 border-l border-line p-3 bg-surface/20 hidden lg:block">{members}</div>
    </div>
  );
}
