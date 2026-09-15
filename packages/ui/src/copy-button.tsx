import { Check, Copy } from "lucide-react";
import * as React from "react";

import { cn } from "@openui/utils";

/**
 * CopyButton.
 *
 * A developer site is mostly copy buttons, and most copy buttons are silent:
 * they swap an icon and nothing else, so a screen-reader user gets no
 * confirmation at all.
 *
 * This one:
 *  - announces the outcome through a polite live region,
 *  - reverts after a timeout that is cleared on unmount (no state update on a
 *    component that is gone),
 *  - falls back to a manual selection when `navigator.clipboard` is unavailable,
 *    which is still the case in a non-secure context.
 */
export interface CopyButtonProps {
  value: string;
  /** Shown next to the icon when `variant="outline"`. */
  label?: string;
  /** Announced after a successful copy, e.g. "Install command copied". */
  announcement?: string;
  variant?: "icon" | "outline";
  className?: string;
}

export function CopyButton({
  value,
  label = "Copy",
  announcement = "Copied to clipboard",
  variant = "icon",
  className,
}: CopyButtonProps): React.JSX.Element {
  const [state, setState] = React.useState<"idle" | "copied" | "failed">("idle");
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = React.useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        throw new Error("Clipboard API unavailable");
      }
      setState("copied");
    } catch {
      setState("failed");
    }

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }, [value]);

  return (
    <>
      <button
        type="button"
        onClick={() => void copy()}
        className={cn(
          "inline-flex items-center gap-2 border border-line bg-transparent",
          "font-mono text-[10px] uppercase tracking-[0.16em] text-graphite",
          "transition-colors duration-fast ease-editorial",
          "hover:border-ink hover:text-ink",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
          variant === "icon" ? "h-8 w-8 justify-center" : "h-9 px-3",
          className,
        )}
      >
        {state === "copied" ? (
          <Check aria-hidden className="h-3.5 w-3.5" />
        ) : (
          <Copy aria-hidden className="h-3.5 w-3.5" />
        )}
        {variant === "outline" ? <span>{state === "copied" ? "Copied" : label}</span> : null}
        <span className="sr-only">{label}</span>
      </button>

      {/* One live region per button: the visible icon swap says nothing to a
          screen reader, and moving focus to announce would be worse. */}
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? announcement : state === "failed" ? "Copy failed. Select the text manually." : ""}
      </span>
    </>
  );
}
