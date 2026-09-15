import { X } from "lucide-react";
import * as React from "react";

import { Dialog as Primitive } from "@openui/primitives";
import { cn } from "@openui/utils";

/**
 * Dialog.
 *
 * A modal is an interruption, so the platform keeps the count low: confirmation
 * of a destructive action, a sign-in prompt, a report form. Navigation is never
 * a dialog.
 *
 * The content is a *panel*, not a floating card — it docks to the bottom on
 * small screens and centres on large ones, which is what keeps a form usable on
 * a phone. `DialogTitle` and `DialogDescription` are exported and required in
 * practice: Radix warns loudly when a dialog has no accessible name, and rightly
 * so.
 *
 * A close control is rendered by default because Escape alone is not discoverable.
 */
export const Dialog = Primitive.Root;
export const DialogTrigger = Primitive.Trigger;
export const DialogClose = Primitive.Close;

export const DialogContent = React.forwardRef<
  React.ComponentRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content> & {
    /** Hides the built-in close button. Only for a dialog that dismisses itself. */
    hideClose?: boolean;
  }
>(function DialogContent({ className, children, hideClose = false, ...props }, ref) {
  return (
    <Primitive.Portal>
      <Primitive.Overlay
        className={cn(
          "fixed inset-0 z-50 bg-ink/60 backdrop-blur-[2px]",
          "data-[state=open]:animate-ink-in motion-reduce:animate-none",
        )}
      />
      <Primitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 flex flex-col gap-5 border border-line bg-paper p-6",
          // Docked on phones, centred from the tablet breakpoint up.
          "inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto",
          "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(34rem,calc(100vw-3rem))]",
          "sm:-translate-x-1/2 sm:-translate-y-1/2",
          "data-[state=open]:animate-ink-in motion-reduce:animate-none",
          className,
        )}
        {...props}
      >
        {children}
        {hideClose ? null : (
          <Primitive.Close
            className={cn(
              "absolute right-4 top-4 grid h-8 w-8 place-items-center border border-transparent text-graphite",
              "transition-colors duration-fast hover:border-line hover:text-ink",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
            )}
          >
            <X aria-hidden className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Primitive.Close>
        )}
      </Primitive.Content>
    </Primitive.Portal>
  );
});

export const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof Primitive.Title>,
  React.ComponentPropsWithoutRef<typeof Primitive.Title>
>(function DialogTitle({ className, ...props }, ref) {
  return (
    <Primitive.Title
      ref={ref}
      className={cn("font-display text-step-3 leading-tight tracking-tight", className)}
      {...props}
    />
  );
});

export const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof Primitive.Description>,
  React.ComponentPropsWithoutRef<typeof Primitive.Description>
>(function DialogDescription({ className, ...props }, ref) {
  return (
    <Primitive.Description
      ref={ref}
      className={cn("text-[0.9rem] leading-relaxed text-graphite", className)}
      {...props}
    />
  );
});

export function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
  return (
    <div
      className={cn("flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}
