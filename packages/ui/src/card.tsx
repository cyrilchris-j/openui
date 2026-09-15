import * as React from "react";

import { cn } from "@openui/utils";

/**
 * Card.
 *
 * A card is a *bounded* piece of content, and the platform uses it sparingly: a
 * grid of identical rounded cards is the single most recognisable tell of a
 * template-generated interface, which is the thing this product exists to argue
 * against.
 *
 * So the default is a hairline-bordered, **square** surface with no shadow and
 * no hover lift. `Card` is used where content genuinely needs a boundary — a
 * resource tile in a dense grid, a form, a code sample — and sections on the
 * marketing pages compose from white space and rules instead.
 *
 * The optional `index` renders the small monospace number in the corner that
 * gives the catalogue its archival feel.
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Renders as an interactive surface: adds a hover rule and cursor affordance. */
  interactive?: boolean;
  /** Catalogue position, rendered as a monospace index label. */
  index?: number | string;
  /**
   * The rendered element. Constrained to non-interactive containers on purpose:
   * a card that is itself a button cannot contain links, and a nested
   * interactive element is a keyboard trap. For a clickable tile, render an
   * `<a>` inside the card and mark the card as `interactive`.
   */
  as?: "div" | "article" | "li" | "section";
}

export function Card({
  className,
  interactive = false,
  index,
  as: Component = "div",
  children,
  ...props
}: CardProps): React.JSX.Element {
  return (
    <Component
      className={cn(
        "relative border border-line bg-paper",
        interactive &&
          "transition-colors duration-fast ease-editorial hover:border-ink focus-within:border-ink",
        className,
      )}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    >
      {index !== undefined ? (
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] tracking-[0.2em] text-graphite"
        >
          {typeof index === "number" ? String(index).padStart(2, "0") : index}
        </span>
      ) : null}
      {children}
    </Component>
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn("flex flex-col gap-1.5 p-5 pb-3", className)} {...props} />;
}

export function CardTitle({
  className,
  as: Component = "h3",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }): React.JSX.Element {
  return (
    <Component
      className={cn("font-display text-step-2 leading-tight tracking-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>): React.JSX.Element {
  return <p className={cn("text-[0.9rem] leading-relaxed text-graphite", className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return <div className={cn("p-5 pt-0", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-t border-line p-4 px-5",
        className,
      )}
      {...props}
    />
  );
}
