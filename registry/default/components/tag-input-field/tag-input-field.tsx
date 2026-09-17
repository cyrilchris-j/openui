"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TagInputFieldProps {
  className?: string;
}

export function TagInputField({ className }: TagInputFieldProps) {
  const [tags, setTags] = useState(["React", "Motion"]);
  const [input, setInput] = useState("");

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((t) => t.filter((i) => i !== tag));
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2 rounded-xl border border-line bg-paper p-2.5 shadow-sm w-full max-w-sm font-mono text-xs", className)}>
      {tags.map((t) => (
        <span key={t} className="flex items-center gap-1 rounded bg-line/20 px-2 py-0.5 text-ink">
          {t}
          <button type="button" onClick={() => removeTag(t)} className="opacity-50 hover:opacity-100">
            ✕
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
        placeholder="Add tag..."
        className="flex-1 bg-transparent outline-none placeholder:text-ink/40 text-xs min-w-[5rem]"
      />
    </div>
  );
}

export default TagInputField;
