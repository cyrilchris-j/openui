"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface PodcastEpisodeStageProps extends React.HTMLAttributes<HTMLElement> {
  episodeNumber?: string;
  title?: string;
  guest?: string;
  duration?: string;
}

export function PodcastEpisodeStage({
  episodeNumber = "EPISODE 42",
  title = "Designing the Next Decade of React & V8 Interfaces",
  guest = "with Elena Rostova & Cyril Chris",
  duration = "48 min",
  className,
  ...props
}: PodcastEpisodeStageProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="bg-neutral-900 text-white rounded-2xl p-6 md:p-10 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 text-xs font-mono text-emerald-400">
            <span>{episodeNumber}</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">
            {title}
          </h2>
          <p className="text-xs text-neutral-400 mt-2 font-mono">
            {guest}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-16 w-16 rounded-full bg-white text-neutral-900 flex items-center justify-center text-xl font-bold hover:scale-105 transition-transform shadow-lg"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <span className="text-[11px] font-mono text-neutral-400">
            {isPlaying ? "Playing snippet..." : "Play 2m preview"}
          </span>
        </div>
      </div>
    </section>
  );
}
