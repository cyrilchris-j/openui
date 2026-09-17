"use client";

import { useState, useRef, useEffect } from "react";
import { Edit2, Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface InlineEditableHeadingProps {
  initialValue?: string;
  className?: string;
}

export function InlineEditableHeading({
  initialValue = "Untitled Project Matrix",
  className,
}: InlineEditableHeadingProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") setIsEditing(false);
    if (e.key === "Escape") {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  return (
    <div className={cn("inline-flex items-center gap-2 group font-sans", className)}>
      {isEditing ? (
        <div className="flex items-center gap-1.5">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={handleKeyDown}
            className="text-lg font-semibold px-2 py-0.5 rounded border border-accent bg-paper text-ink focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="p-1 rounded bg-accent text-white"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 cursor-pointer px-2 py-0.5 rounded hover:bg-surface/80 transition-colors"
        >
          <span className="text-lg font-semibold text-ink">{value}</span>
          <Edit2 className="w-3.5 h-3.5 text-ink/30 group-hover:text-ink/70 transition-colors" />
        </div>
      )}
    </div>
  );
}
