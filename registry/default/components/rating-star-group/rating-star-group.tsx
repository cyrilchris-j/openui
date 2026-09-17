"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RatingStarGroupProps {
  initialRating?: number;
  className?: string;
}

export function RatingStarGroup({ initialRating = 4, className }: RatingStarGroupProps) {
  const [rating, setRating] = useState(initialRating);

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-3 shadow-sm", className)}>
      <div className="flex gap-1 text-ink">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="text-lg transition-transform active:scale-90"
          >
            {star <= rating ? "★" : "☆"}
          </button>
        ))}
      </div>
      <span className="font-mono text-xs font-bold text-ink">{rating}.0 / 5.0</span>
    </div>
  );
}

export default RatingStarGroup;
