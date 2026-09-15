import * as React from "react";

import { Tooltip as Primitive } from "@openui/primitives";
import { cn } from "@openui/utils";

/**
 * Tooltip.
 *
 * A short name for a control that is already visible — never the only place a
 * piece of information exists. The content is a dark plate with monospace type,
 * which reads as an annotation rather than as a speech bubble.
 *
 * `TooltipProvider` is exported separately and should be rendered once near the
 * application root: Radix shares the open delay across a group, so a toolbar of
 * icon buttons reveals its hints immediately once the first one has opened.
 */
export const TooltipProvider = Primitive.Provider;
export const Tooltip = Primitive.Root;
export const TooltipTrigger = Primitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content>
>(function TooltipContent({ className, sideOffset = 8, ...props }, ref) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-w-[16rem] border border-ink bg-ink px-2.5 py-1.5",
          "font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-paper",
          "data-[state=delayed-open]:animate-ink-in motion-reduce:animate-none",
          className,
        )}
        {...props}
      />
    </Primitive.Portal>
  );
});
