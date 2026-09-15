import * as React from "react";

import { cn } from "@openui/utils";

/**
 * Input.
 *
 * A control with no visible label is a guess, so the component makes the
 * accessible path the easy one: pass `label`, and it renders a real `<label>`
 * bound by `htmlFor`. Pass `error` and the message is wired through
 * `aria-describedby` with `aria-invalid` set — not merely coloured red, which
 * conveys nothing to a screen reader and is invisible to a colour-blind user.
 *
 * The border is a hairline that thickens to ink on focus, so focus is conveyed
 * by *weight* as well as by colour.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Helper text shown below the control. Replaced by `error` when present. */
  hint?: string;
  error?: string;
  /** Renders as a monospace field — for slugs, tokens and identifiers. */
  mono?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, hint, error, mono = false, id, required, ...props },
  ref,
) {
  const generated = React.useId();
  const inputId = id ?? generated;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="eyebrow">
          {label}
          {required ? (
            <span aria-hidden className="ml-1 text-oxide">
              *
            </span>
          ) : null}
        </label>
      ) : null}

      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "h-11 w-full border-b border-line bg-transparent px-0 py-2 text-ink",
          "placeholder:text-graphite/60",
          "transition-colors duration-fast ease-editorial",
          "focus:border-ink focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          mono && "font-mono text-[0.9rem]",
          error && "border-oxide",
          className,
        )}
        {...props}
      />

      {error ? (
        // `role="alert"` so the message is announced when it appears after a
        // submit, rather than only when focus passes over the field.
        <p id={`${inputId}-error`} role="alert" className="text-[0.8rem] text-oxide">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-[0.8rem] text-graphite">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, label, hint, error, id, required, rows = 5, ...props },
  ref,
) {
  const generated = React.useId();
  const textareaId = id ?? generated;
  const describedBy = error ? `${textareaId}-error` : hint ? `${textareaId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={textareaId} className="eyebrow">
          {label}
        </label>
      ) : null}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          "w-full border border-line bg-transparent p-3 text-ink",
          "placeholder:text-graphite/60",
          "transition-colors duration-fast ease-editorial",
          "focus:border-ink focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-oxide",
          className,
        )}
        {...props}
      />

      {error ? (
        <p id={`${textareaId}-error`} role="alert" className="text-[0.8rem] text-oxide">
          {error}
        </p>
      ) : hint ? (
        <p id={`${textareaId}-hint`} className="text-[0.8rem] text-graphite">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
