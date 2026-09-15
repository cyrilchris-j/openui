import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";

import { Slot } from "@openui/primitives";
import { cn } from "@openui/utils";

/**
 * Button.
 *
 * Three variants, and the *choice* between them carries meaning:
 *
 *  - `primary` — the one action a surface exists for. At most one per view.
 *  - `outline` — a real, available alternative.
 *  - `ghost` — an action that would otherwise clutter the composition.
 *
 * Shape is sharp and the label is uppercased and tracked, which is the
 * typographic device that distinguishes an action from a link on this site.
 *
 * Accessibility is handled rather than documented:
 *  - `loading` sets `aria-busy`, disables the control and keeps the label in the
 *    layout so nothing shifts when the state changes.
 *  - `iconOnly` requires an `aria-label`, enforced by the type.
 *  - `asChild` renders the caller's element — used for links that look like
 *    buttons, which must stay `<a>` so they can be middle-clicked.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-sans text-[0.78rem] font-medium uppercase tracking-[0.14em]",
    "border transition-colors duration-fast ease-editorial",
    "disabled:pointer-events-none disabled:opacity-40",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
    "motion-reduce:transition-none",
  ],
  {
    variants: {
      variant: {
        primary: "border-ink bg-ink text-paper hover:bg-oxide hover:border-oxide",
        outline: "border-line bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
        ghost: "border-transparent bg-transparent text-graphite hover:text-ink hover:border-line",
        danger: "border-oxide bg-transparent text-oxide hover:bg-oxide hover:text-paper",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-[0.85rem]",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Shows a spinner and disables the control without collapsing the label. */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, loading = false, disabled, children, ...props },
  ref,
) {
  const Component = asChild ? Slot.Root : "button";

  if (asChild) {
    // `asChild` hands the caller full control of the element, so no state
    // affordance is injected — there is nowhere to put a spinner.
    return (
      <Component className={cn(buttonVariants({ variant, size }), className)} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <Loader2 aria-hidden className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" />
      ) : null}
      {children}
    </Component>
  );
});

export { buttonVariants };
