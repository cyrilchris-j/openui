"use client";

import { useState } from "react";
import { Plus, Check, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

export function KanbanMiniColumn({ className }: { className?: string }) {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Review RFC for auth tokens", done: false },
    { id: "2", title: "Migrate registry bundles to CDN", done: true },
    { id: "3", title: "Benchmark latency on edge proxy", done: false },
  ]);
  const [newTitle, setNewTitle] = useState("");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setTasks((prev) => [...prev, { id: String(Date.now()), title: newTitle.trim(), done: false }]);
    setNewTitle("");
  };

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className={cn("w-72 rounded-xl border border-line bg-surface/40 p-3 flex flex-col gap-2 font-sans", className)}>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-ink">In Progress</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-line text-ink/60">
            {tasks.filter((t) => !t.done).length}
          </span>
        </div>
        <MoreHorizontal className="w-4 h-4 text-ink/40 cursor-pointer hover:text-ink" />
      </div>

      <div className="flex flex-col gap-1.5">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggle(task.id)}
            className={cn(
              "flex items-start gap-2 p-2.5 rounded-lg border border-line bg-paper cursor-pointer transition-colors shadow-xs",
              task.done ? "opacity-60 bg-surface/60" : "hover:border-accent/40"
            )}
          >
            <div
              className={cn(
                "w-4 h-4 rounded border flex items-center justify-center mt-0.5 transition-colors",
                task.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-line"
              )}
            >
              {task.done && <Check className="w-3 h-3" />}
            </div>
            <span className={cn("text-xs text-ink flex-1", task.done && "line-through text-ink/50")}>
              {task.title}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={addTask} className="mt-1 flex items-center gap-1.5">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task..."
          className="flex-1 px-2.5 py-1.5 text-xs rounded-md border border-line bg-paper text-ink focus:outline-none focus:border-accent font-sans"
        />
        <button
          type="submit"
          className="p-1.5 rounded-md bg-accent text-white hover:bg-accent/90 transition-colors"
          aria-label="Add task"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
