"use client";

import { cn } from "@/lib/cn";

export interface HeaderBannerAnnouncementProps extends React.HTMLAttributes<HTMLDivElement> {
  banner?: React.ReactNode;
  navbar?: React.ReactNode;
  children?: React.ReactNode;
}

export function HeaderBannerAnnouncement({
  banner,
  navbar,
  children,
  className,
  ...props
}: HeaderBannerAnnouncementProps) {
  return (
    <div className={cn("w-full border border-line rounded-xl overflow-hidden bg-paper font-sans", className)} {...props}>
      {banner && <div className="p-2 bg-accent text-white text-center text-xs font-mono font-semibold">{banner}</div>}
      {navbar && <div className="p-4 border-b border-line flex items-center justify-between">{navbar}</div>}
      <main className="p-6">{children}</main>
    </div>
  );
}
