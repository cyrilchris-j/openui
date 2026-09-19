import * as React from "react";
import { useReducedMotion } from "../core/device.js";

/* -------------------------------------------------------------------------- */
/* Elastic Toggle Switch                                                      */
/* -------------------------------------------------------------------------- */
export interface ElasticToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function ElasticToggle({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  className = "",
}: ElasticToggleProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label className={`inline-flex items-center gap-3 cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-line/30 transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxide ${
          isChecked ? "bg-ink border-ink" : "bg-surface"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-paper shadow-xs transition-transform will-change-transform ${
            isChecked ? "translate-x-6" : "translate-x-1"
          }`}
          style={{
            transitionTimingFunction: reduced
              ? "ease"
              : "cubic-bezier(0.34, 1.56, 0.64, 1)", // spring bounce
            transitionDuration: reduced ? "100ms" : "280ms",
          }}
        />
      </button>
      {label && <span className="text-xs font-mono text-ink">{label}</span>}
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* Rebound Checkbox                                                           */
/* -------------------------------------------------------------------------- */
export interface ReboundCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function ReboundCheckbox({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
  className = "",
}: ReboundCheckboxProps): React.JSX.Element {
  const reduced = useReducedMotion();
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    setInternalChecked(next);
    onChange?.(next);
  };

  return (
    <label className={`inline-flex items-center gap-2.5 cursor-pointer select-none ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}>
      <button
        type="button"
        role="checkbox"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={toggle}
        className={`relative flex h-5 w-5 items-center justify-center rounded-sm border transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oxide ${
          isChecked ? "bg-ink border-ink text-paper" : "bg-paper border-line hover:border-ink/50"
        }`}
        style={{
          transform: isChecked && !reduced ? "scale(1.06)" : "scale(1)",
        }}
      >
        <svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline
            points="3.5 8.5 6.5 11.5 12.5 5"
            style={{
              strokeDasharray: 20,
              strokeDashoffset: isChecked ? 0 : 20,
              transition: reduced ? "none" : "stroke-dashoffset 220ms ease-out",
            }}
          />
        </svg>
      </button>
      {label && <span className="text-xs font-mono text-ink">{label}</span>}
    </label>
  );
}
