import * as React from "react";

import { cn } from "@openui/utils";

/**
 * Label.
 *
 * A `<label>` with the platform's tracked-uppercase treatment. It is separate
 * from the one `Input` renders internally so that a group of controls — a radio
 * set, a token picker — can have a heading that is *not* bound to a single
 * input, using `id` plus `aria-labelledby` on the group instead.
 *
 * `required` renders a marker that is hidden from assistive technology: the
 * `required` attribute on the control is what a screen reader announces, and
 * hearing "asterisk" adds nothing.
 */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  /** Skips the uppercase treatment for inline, sentence-case labels. */
  plain?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, children, required, plain = false, ...props },
  ref,
) {
  return (
    <label
      ref={ref}
      className={cn(plain ? "text-[0.9rem] text-ink" : "eyebrow", "block", className)}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden className="ml-1 text-oxide">
          *
        </span>
      ) : null}
    </label>
  );
});

/**
 * The marker that makes a required field visible before the user submits and
 * gets an error. Kept as an export so forms that compose their own labels stay
 * consistent with the ones `Input` renders.
 */
export function RequiredMark(): React.JSX.Element {
  return (
    <span aria-hidden className="ml-1 text-oxide">
      *
    </span>
  );
}
