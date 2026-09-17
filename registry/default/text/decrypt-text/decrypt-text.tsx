"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const CIPHER = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#$%&";

/** Stable pseudo-random from an index: same input, same glyph, always. */
function keyedGlyph(index: number, salt: number): string {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return CIPHER[Math.abs(Math.floor(value)) % CIPHER.length] ?? "#";
}

export interface DecryptTextProps {
  text: string;
  /** Positions resolved per animation frame. */
  rate?: number;
  /** Re-runs the decryption; parent can trigger from anywhere. */
  runToken?: number;
  onDecrypted?: () => void;
  className?: string;
}

export function DecryptText({ text, rate = 1, runToken = 0, onDecrypted, className }: DecryptTextProps) {
  const [output, setOutput] = useState(() =>
    [...text].map((char, index) => (char === " " ? " " : keyedGlyph(index, 0))).join(""),
  );
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const frame = useRef<number | null>(null);

  const run = useCallback(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setOutput(text);
      setStatus("done");
      onDecrypted?.();
      return;
    }

    let resolved = 0;
    let salt = 0;
    setStatus("running");

    const step = () => {
      salt++;
      resolved = Math.min(text.length, resolved + rate);
      setOutput(
        [...text]
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < resolved) return char;
            return keyedGlyph(index, salt);
          })
          .join(""),
      );
      if (resolved < text.length) {
        frame.current = requestAnimationFrame(step);
      } else {
        setStatus("done");
        onDecrypted?.();
      }
    };

    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(step);
  }, [text, rate, onDecrypted]);

  useEffect(() => {
    if (runToken > 0) run();
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [runToken, run]);

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={`Decrypt message: ${text}`}
      className={cn(
        "inline-block cursor-pointer font-mono tabular-nums",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
        className,
      )}
      onClick={run}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          run();
        }
      }}
    >
      {output}
      <span aria-live="polite" className="sr-only">
        {status === "done" ? "Message decrypted" : status === "running" ? "Decrypting" : "Press to decrypt"}
      </span>
    </span>
  );
}

export default DecryptText;
