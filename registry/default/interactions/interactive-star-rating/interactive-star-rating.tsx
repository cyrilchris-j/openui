"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveStarRatingProps {
  className?: string;
}

export function InteractiveStarRating({ className }: InteractiveStarRatingProps) {
  const [rating, setRating] = useState(4);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">RATING: {hovered ?? rating} / 5</span>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onPointerEnter={() => setHovered(star)}
            onPointerLeave={() => setHovered(null)}
            onClick={() => setRating(star)}
            className="text-2xl transition-transform hover:scale-125"
          >
            {star <= (hovered ?? rating) ? "★" : "☆"}
          </button>
        ))}
      </div>
    </div>
  );
}

export default InteractiveStarRating;
