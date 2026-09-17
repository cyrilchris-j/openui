"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface IdleFadeWhisperProps {
  children: string;
  /** Seconds of idle before fading begins. */
  idleSeconds?: number;
  /** Fade duration in seconds. */
  fadeSeconds?: number;
  className?: string;
}

export function IdleFadeWhisper({ children, idleSeconds = 4, fadeSeconds = 6, className }: IdleFadeWhisperProps) {
  const [idle, setIdle] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    let timer: number;
    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), idleSeconds * 1000);
    };
    wake();
    window.addEventListener("pointermove", wake);
    window.addEventListener("keydown", wake);
    window.addEventListener("scroll", wake, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointermove", wake);
      window.removeEventListener("keydown", wake);
      window.removeEventListener("scroll", wake);
    };
  }, [idleSeconds, reduced]);

  return (
    <p
      className={cn("max-w-prose text-xl leading-relaxed text-ink", className)}
      style={{
        opacity: idle && !reduced ? 0.15 : 1,
        transition: `opacity ${fadeSeconds}s ease`,
      }}
    >
      {children}
    </p>
  );
}

export default IdleFadeWhisper;
