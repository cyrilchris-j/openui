"use client";

import { cn } from "@/lib/cn";

export interface AvatarCollaboratorStackProps {
  names?: string[];
  className?: string;
}

export function AvatarCollaboratorStack({
  names = ["Elena", "Sora", "Marcus", "Kaelen"],
  className,
}: AvatarCollaboratorStackProps) {
  return (
    <div className={cn("inline-flex items-center -space-x-2", className)}>
      {names.map((n) => (
        <div
          key={n}
          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-paper bg-ink font-mono text-xs font-bold text-paper shadow-sm"
        >
          {n[0]}
        </div>
      ))}
    </div>
  );
}

export default AvatarCollaboratorStack;
