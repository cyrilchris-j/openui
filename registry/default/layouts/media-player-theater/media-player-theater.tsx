"use client";

import { cn } from "@/lib/cn";

export interface MediaPlayerTheaterProps extends React.HTMLAttributes<HTMLDivElement> {
  screen?: React.ReactNode;
  playlist?: React.ReactNode;
  children?: React.ReactNode;
}

export function MediaPlayerTheater({ screen, playlist, children, className, ...props }: MediaPlayerTheaterProps) {
  return (
    <div className={cn("max-w-4xl mx-auto p-4 space-y-4 font-sans", className)} {...props}>
      <div className="aspect-video w-full rounded-2xl bg-black border border-line flex items-center justify-center overflow-hidden">
        {screen}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-8 space-y-4">{children}</div>
        {playlist && <aside className="md:col-span-4 p-4 rounded-xl border border-line bg-surface/30">{playlist}</aside>}
      </div>
    </div>
  );
}
