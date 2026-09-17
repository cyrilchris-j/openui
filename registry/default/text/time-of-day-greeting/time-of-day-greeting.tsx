"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const SEGMENTS = [
  { until: 5, word: "night", sky: ["#1b1f3b", "#3b2f4e"] },
  { until: 12, word: "morning", sky: ["#f6d6a8", "#b7d3e8"] },
  { until: 18, word: "afternoon", sky: ["#a8c8e8", "#e8d5a8"] },
  { until: 22, word: "evening", sky: ["#e8a87c", "#5b4a6e"] },
  { until: 24, word: "night", sky: ["#1b1f3b", "#3b2f4e"] },
] as const;

export interface TimeOfDayGreetingProps {
  name?: string;
  className?: string;
}

export function TimeOfDayGreeting({ name = "friend", className }: TimeOfDayGreetingProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(timer);
  }, []);

  const hour = now.getHours();
  const segment = SEGMENTS.find((entry) => hour < entry.until) ?? SEGMENTS[SEGMENTS.length - 1]!;
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const time = `${hour}:${minutes}`;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h2 className="font-display text-step-4 leading-tight text-ink" role="status" aria-label={`Good ${segment.word}, ${name}. It is ${time}.`}>
        Good <span style={{ background: `linear-gradient(90deg, ${segment.sky[0]}, ${segment.sky[1]})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{segment.word}</span>, {name}.
      </h2>
      <p className="font-mono text-sm tabular-nums text-ink/60" aria-hidden>
        {time}
      </p>
    </div>
  );
}

export default TimeOfDayGreeting;
