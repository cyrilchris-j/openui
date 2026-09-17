"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface VideoExplainerStageProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  duration?: string;
}

export function VideoExplainerStage({
  title = "Watch How 800 Verified Resources Assemble",
  duration = "2 min walk-through",
  className,
  ...props
}: VideoExplainerStageProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className={cn("py-16 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink text-center", className)} {...props}>
      <h2 className="text-2xl font-bold text-ink mb-2">{title}</h2>
      <p className="text-xs font-mono text-ink/60 mb-6">{duration}</p>
      <div
        onClick={() => setPlaying(!playing)}
        className="aspect-video w-full rounded-3xl border border-line bg-black flex items-center justify-center cursor-pointer shadow-xl relative overflow-hidden group"
      >
        <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center pl-1 font-bold text-xl group-hover:scale-110 transition-transform">
          {playing ? "❚❚" : "▶"}
        </div>
        <div className="absolute bottom-4 left-6 text-white/80 font-mono text-xs">
          OpenUI Architecture Walkthrough
        </div>
      </div>
    </section>
  );
}
