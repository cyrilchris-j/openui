import * as React from "react";

import { ToggleGroup } from "@openui/primitives";
import { cn } from "@openui/utils";

/**
 * SegmentedControl.
 *
 * The widget for a small set of mode-like or mutually-exclusive choices: grid vs
 * list, light vs dark, React vs Vue. It is a *toggle group*, not a set of links,
 * because choosing an option changes the view in place rather than navigating.
 *
 * Two deliberate differences from a generic segmented control:
 *
 *  - It is not a pill. Options are separated by hairlines inside one bordered
 *    row, which keeps it consistent with the rest of the interface and avoids
 *    the "bubble" look.
 *  - The control is a `radiogroup` when single-select, so arrow keys move
 *    between options and the selection is announced with its position.
 *
 * For choices that navigate, use links. For choices that submit, use a form.
 */
export interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
  /** Optional leading icon, hidden from assistive technology. */
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  options: readonly SegmentedControlOption[];
  value: string;
  onValueChange: (value: string) => void;
  /** Accessible name for the group. Required: an unlabelled group is a mystery. */
  label: string;
  /** Renders the label only for assistive technology. */
  hideLabel?: boolean;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onValueChange,
  label,
  hideLabel = false,
  className,
}: SegmentedControlProps): React.JSX.Element {
  const labelId = React.useId();

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span id={labelId} className={hideLabel ? "sr-only" : "eyebrow"}>
        {label}
      </span>
      <ToggleGroup.Root
        type="single"
        value={value}
        onValueChange={(next) => {
          // Radix reports an empty string when the active item is re-pressed.
          // A segmented control always has a selection, so that is ignored.
          if (next) onValueChange(next);
        }}
        aria-labelledby={labelId}
        className="inline-flex flex-wrap border border-line"
      >
        {options.map((option) => (
          <ToggleGroup.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2",
              "eyebrow text-graphite",
              "border-r border-line last:border-r-0",
              "transition-colors duration-fast ease-editorial",
              "hover:text-ink",
              "data-[state=on]:bg-ink data-[state=on]:text-paper",
              "disabled:cursor-not-allowed disabled:opacity-40",
            )}
          >
            {option.icon ? <span aria-hidden>{option.icon}</span> : null}
            {option.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
}
