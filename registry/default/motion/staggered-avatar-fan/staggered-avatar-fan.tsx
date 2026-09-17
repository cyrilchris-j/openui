"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface StaggeredAvatarFanProps {
  className?: string;
}

export function StaggeredAvatarFan({ className }: StaggeredAvatarFanProps) {
  const [fanned, setFanned] = useState(false);
  const avatars = ["Alex", "Elena", "Marcus", "Sora", "Devon"];

  return (
    <div
      onPointerEnter={() => setFanned(true)}
      onPointerLeave={() => setFanned(false)}
      className={cn("flex h-44 w-full max-w-sm items-center justify-center rounded-xl border border-line bg-paper p-6", className)}
    >
      <div className="relative flex items-center justify-center">
        {avatars.map((name, idx) => {
          const mid = (avatars.length - 1) / 2;
          const offset = idx - mid;
          return (
            <div
              key={name}
              className="absolute flex h-12 w-12 items-center justify-center rounded-full border-2 border-paper bg-ink text-xs font-bold text-paper shadow-md transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                transform: fanned
                  ? `translateX(${offset * 36}px) rotate(${offset * 8}deg)`
                  : `translateX(${offset * 14}px)`,
                zIndex: idx,
              }}
            >
              {name[0]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StaggeredAvatarFan;
