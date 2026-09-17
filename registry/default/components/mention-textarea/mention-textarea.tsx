"use client";

import { useState, useRef } from "react";
import { AtSign, User } from "lucide-react";
import { cn } from "@/lib/cn";

export function MentionTextarea({ className }: { className?: string }) {
  const [text, setText] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const users = ["alex.morgan", "clara.oswald", "devon.reed", "elena.rostova"];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    if (val.endsWith("@")) {
      setShowMentions(true);
    } else if (showMentions && !val.includes("@")) {
      setShowMentions(false);
    }
  };

  const insertMention = (username: string) => {
    setText((prev) => prev.slice(0, prev.lastIndexOf("@")) + `@${username} `);
    setShowMentions(false);
  };

  return (
    <div className={cn("relative max-w-sm w-full font-sans text-xs", className)}>
      <div className="relative rounded-lg border border-line bg-paper focus-within:border-accent p-2.5 shadow-sm">
        <textarea
          rows={3}
          value={text}
          onChange={handleChange}
          placeholder="Write a message... Type @ to mention a team member"
          className="w-full bg-transparent resize-none text-ink focus:outline-none"
        />
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-line text-[11px] text-ink/50 font-mono">
          <span className="flex items-center gap-1">
            <AtSign className="w-3 h-3" /> mention
          </span>
          <span>{text.length} chars</span>
        </div>
      </div>

      {showMentions && (
        <div className="absolute left-2 bottom-full mb-1 w-48 rounded-lg border border-line bg-paper shadow-lg p-1 z-20">
          <div className="text-[10px] font-mono text-ink/40 px-2 py-1 uppercase">Members</div>
          {users.map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => insertMention(u)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-surface text-ink text-left transition-colors"
            >
              <User className="w-3.5 h-3.5 text-accent" />
              <span>{u}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
