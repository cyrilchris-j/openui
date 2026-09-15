"use client";

import { useId, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Segmented Control
 *
 * Uses `role="radiogroup"` because a segmented control *is* a single-choice
 * input. That gives screen readers the right model (one of N, current value)
 * and lets us implement roving tabindex: exactly one segment is tabbable, and
 * arrow keys move between them, as in a native radio group.
 */

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  /** Optional short description for assistive technology. */
  description?: string;
}

export interface SegmentedControlProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  label: string;
  size?: "sm" | "md";
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  defaultValue,
  onValueChange,
  label,
  size = "md",
  className,
}: SegmentedControlProps<T>) {
  const [internal, setInternal] = useState<T>(defaultValue ?? options[0]!.value);
  const selected = value ?? internal;
  const groupId = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function select(next: T) {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  }

  function move(delta: number) {
    const index = options.findIndex((option) => option.value === selected);
    const next = options[(index + delta + options.length) % options.length]!;
    select(next.value);
    const target = refs.current[options.findIndex((option) => option.value === next.value)];
    target?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("inline-flex border border-ink", className)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          move(1);
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          move(-1);
        }
      }}
    >
      {options.map((option, index) => {
        const active = option.value === selected;
        return (
          <button
            key={option.value}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            id={`${groupId}-${option.value}`}
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            aria-describedby={option.description ? `${groupId}-${option.value}-desc` : undefined}
            onClick={() => select(option.value)}
            className={cn(
              "border-r border-ink px-4 uppercase tracking-[0.16em] transition-colors last:border-r-0",
              "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-oxide",
              size === "sm" ? "py-1 text-[11px]" : "py-2 text-xs",
              active ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-ink/5",
            )}
          >
            {option.label}
            {option.description ? (
              <span id={`${groupId}-${option.value}-desc`} className="sr-only">
                {option.description}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
