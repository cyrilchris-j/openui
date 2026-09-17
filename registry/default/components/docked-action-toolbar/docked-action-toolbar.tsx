"use client";

import { useState } from "react";
import { MessageSquare, Share, Bookmark, ThumbsUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

export function DockedActionToolbar({ className }: { className?: string }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className={cn("inline-flex items-center gap-1 p-1.5 rounded-full border border-line bg-paper/90 backdrop-blur-md shadow-lg font-sans", className)}>
      <button
        type="button"
        onClick={() => setLiked(!liked)}
        className={cn(
          "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-colors",
          liked ? "bg-red-500/15 text-red-500 font-semibold" : "text-ink/70 hover:bg-surface hover:text-ink"
        )}
      >
        <ThumbsUp className="w-3.5 h-3.5" />
        <span>{liked ? "43" : "42"}</span>
      </button>

      <div className="w-px h-4 bg-line" />

      <button
        type="button"
        className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-ink/70 hover:bg-surface hover:text-ink transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>18</span>
      </button>

      <button
        type="button"
        onClick={() => setSaved(!saved)}
        className={cn(
          "p-2 rounded-full transition-colors",
          saved ? "bg-accent/15 text-accent" : "text-ink/70 hover:bg-surface hover:text-ink"
        )}
        aria-label="Save"
      >
        <Bookmark className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        className="p-2 rounded-full text-ink/70 hover:bg-surface hover:text-ink transition-colors"
        aria-label="Share"
      >
        <Share className="w-3.5 h-3.5" />
      </button>

      <button
        type="button"
        className="ml-1 p-2 rounded-full bg-accent text-white hover:bg-accent/90 transition-transform active:scale-95"
        aria-label="AI Insight"
      >
        <Sparkles className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
