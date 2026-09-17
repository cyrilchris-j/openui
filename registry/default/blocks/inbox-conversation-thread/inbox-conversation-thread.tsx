"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InboxConversationThread({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [messages, setMessages] = React.useState([
    { from: "Marcus", text: "Are all 800 manifests passing the catalog validator?", time: "14:20" },
    { from: "You", text: "Yes! 0 duplicate fingerprints and 0 TypeScript errors.", time: "14:22" },
  ]);
  const [input, setInput] = React.useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { from: "You", text: input, time: "Just now" }]);
    setInput("");
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs flex flex-col h-[400px]", className)} {...props}>
      <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800 font-semibold text-neutral-900 dark:text-white">
        #engineering-sync • 3 participants
      </div>
      <div className="flex-1 overflow-y-auto py-4 space-y-3">
        {messages.map((m, idx) => (
          <div key={idx} className={cn("flex flex-col", m.from === "You" ? "items-end" : "items-start")}>
            <div className={cn("p-3 rounded-xl max-w-sm", m.from === "You" ? "bg-emerald-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white")}>
              {m.text}
            </div>
            <span className="text-[10px] text-neutral-400 mt-1">{m.time}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Reply to thread..."
          className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
        />
        <button type="submit" className="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold">
          Send
        </button>
      </form>
    </div>
  );
}
