import * as React from "react";

import { cn } from "@openui/utils";

/**
 * VisuallyHidden.
 *
 * Hides content from sight while leaving it in the accessibility tree. Use it
 * for text that a sighted user infers from context but a screen reader cannot:
 * the meaning of an icon-only control, the "opens in a new tab" note on an
 * external link, a table caption that would be redundant visually.
 *
 * This is **not** a way to hide information. If a user needs it to complete a
 * task, it belongs on screen; `display: none` or `aria-hidden` is the right tool
 * when it genuinely does not.
 */
export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: "span" | "div" | "p";
}

export function VisuallyHidden({
  className,
  as: Component = "span",
  ...props
}: VisuallyHiddenProps): React.JSX.Element {
  return <Component className={cn("sr-only", className)} {...props} />;
}
