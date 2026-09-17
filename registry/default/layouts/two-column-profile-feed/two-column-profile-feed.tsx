"use client";

import { cn } from "@/lib/cn";

export interface TwoColumnProfileFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  bio?: React.ReactNode;
  children?: React.ReactNode;
}

export function TwoColumnProfileFeed({ bio, children, className, ...props }: TwoColumnProfileFeedProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <aside className="lg:col-span-4 lg:sticky lg:top-6 p-6 rounded-2xl border border-line bg-surface/30">{bio}</aside>
      <main className="lg:col-span-8 space-y-4">{children}</main>
    </div>
  );
}
