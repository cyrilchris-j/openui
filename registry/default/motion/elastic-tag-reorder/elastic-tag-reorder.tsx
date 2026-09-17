"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticTagReorderProps {
  className?: string;
}

export function ElasticTagReorder({ className }: ElasticTagReorderProps) {
  const [tags, setTags] = useState(["React", "Motion", "Tailwind", "Design", "CSS"]);

  const shuffle = () => {
    setTags([...tags].sort(() => Math.random() - 0.5));
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex flex-wrap gap-2 max-w-xs justify-center">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-line bg-paper px-3 py-1 font-mono text-xs text-ink shadow-sm transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={shuffle}
        className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
      >
        Shuffle Order
      </button>
    </div>
  );
}

export default ElasticTagReorder;
