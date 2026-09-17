"use client";

import { cn } from "@/lib/cn";

export interface AvatarBadgeGroupProps {
  users?: { name: string; online: boolean }[];
  className?: string;
}

export function AvatarBadgeGroup({
  users = [
    { name: "Linus", online: true },
    { name: "Ada", online: true },
    { name: "Grace", online: false },
  ],
  className,
}: AvatarBadgeGroupProps) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <div className="flex -space-x-2">
        {users.map((u) => (
          <div key={u.name} className="relative group">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-paper bg-ink text-xs font-bold text-paper shadow-sm">
              {u.name[0]}
            </div>
            {u.online && (
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-paper bg-emerald-500" />
            )}
          </div>
        ))}
      </div>
      <span className="ml-3 font-mono text-xs text-ink/60">+4 contributors</span>
    </div>
  );
}

export default AvatarBadgeGroup;
