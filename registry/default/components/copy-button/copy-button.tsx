"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * Copy Button
 *
 * Clipboard code is usually written as `navigator.clipboard.writeText(value)`
 * with no `catch`, which silently does nothing in an insecure context or when
 * the permission is denied. This component treats failure as a first-class
 * state: the icon changes, the live region says what happened, and the button
 * never claims success it did not have.
 */

export type CopyStatus = "idle" | "copied" | "failed";

export interface CopyButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onCopy"> {
  value: string;
  label?: string;
  copiedLabel?: string;
  failedLabel?: string;
  /** Reset delay in ms. */
  resetAfter?: number;
  onCopied?: (value: string) => void;
}

async function writeToClipboard(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }

  // Legacy path for insecure contexts (http://localhost is fine, plain http is not).
  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(area);
    return ok;
  } catch {
    return false;
  }
}

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  failedLabel = "Press ⌘C",
  resetAfter = 1800,
  onCopied,
  className,
  ...props
}: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = useCallback(async () => {
    const ok = await writeToClipboard(value);
    setStatus(ok ? "copied" : "failed");
    if (ok) onCopied?.(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), resetAfter);
  }, [onCopied, resetAfter, value]);

  const Icon = status === "copied" ? Check : status === "failed" ? TriangleAlert : Copy;
  const text = status === "copied" ? copiedLabel : status === "failed" ? failedLabel : label;

  return (
    <button
      type="button"
      onClick={copy}
      data-status={status}
      className={cn(
        "inline-flex items-center gap-2 border border-line px-3 py-1.5",
        "font-mono text-[11px] uppercase tracking-[0.18em] text-graphite",
        "transition-colors hover:border-ink hover:text-ink",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
        status === "copied" && "border-moss text-moss",
        status === "failed" && "border-oxide text-oxide",
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {text}
      <span role="status" aria-live="polite" className="sr-only">
        {status === "copied" ? "Copied to clipboard" : status === "failed" ? "Copy failed" : ""}
      </span>
    </button>
  );
}

export default CopyButton;
