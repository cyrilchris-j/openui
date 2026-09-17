"use client";

import { cn } from "@/lib/cn";

export interface AvatarProfileCardProps {
  name?: string;
  role?: string;
  handle?: string;
  className?: string;
}

export function AvatarProfileCard({
  name = "Marcus Vance",
  role = "Core Architecture Lead",
  handle = "@mvance",
  className,
}: AvatarProfileCardProps) {
  return (
    <div className={cn("flex w-full max-w-xs items-center gap-3.5 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-mono text-sm font-bold text-paper shadow">
        {name[0]}
      </div>
      <div>
        <h5 className="font-display text-sm font-bold text-ink leading-none">{name}</h5>
        <p className="mt-1 font-mono text-[10px] text-ink/60">{role}</p>
        <span className="font-mono text-[9px] text-ink/40">{handle}</span>
      </div>
    </div>
  );
}

export default AvatarProfileCard;
