import * as React from "react";

import { DropdownMenu as Primitive } from "@openui/primitives";
import { cn } from "@openui/utils";

/**
 * Dropdown menu.
 *
 * Used for account actions, sort order and per-row operations. Note the styling
 * choice that matters: no rounded corners, no shadow, no animation beyond a
 * short fade. A menu is a piece of the interface, not a bubble floating over it.
 *
 * `DropdownMenuItem` does not force a highlight colour, so an item can render
 * its own icon and label composition. Every item must be reachable by keyboard
 * — Radix handles that, and nothing here overrides the roving focus.
 */
export const DropdownMenu = Primitive.Root;
export const DropdownMenuTrigger = Primitive.Trigger;
export const DropdownMenuGroup = Primitive.Group;
export const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof Primitive.Label>,
  React.ComponentPropsWithoutRef<typeof Primitive.Label>
>(function DropdownMenuLabel({ className, ...props }, ref) {
  return (
    <Primitive.Label
      ref={ref}
      className={cn("px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-graphite", className)}
      {...props}
    />
  );
});

export const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof Primitive.Separator>,
  React.ComponentPropsWithoutRef<typeof Primitive.Separator>
>(function DropdownMenuSeparator({ className, ...props }, ref) {
  return <Primitive.Separator ref={ref} className={cn("my-1 h-px bg-line", className)} {...props} />;
});

export const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content>
>(function DropdownMenuContent({ className, sideOffset = 6, ...props }, ref) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] border border-line bg-paper py-1",
          "data-[state=open]:animate-ink-in motion-reduce:animate-none",
          className,
        )}
        {...props}
      />
    </Primitive.Portal>
  );
});

export const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof Primitive.Item>,
  React.ComponentPropsWithoutRef<typeof Primitive.Item> & { destructive?: boolean }
>(function DropdownMenuItem({ className, destructive = false, ...props }, ref) {
  return (
    <Primitive.Item
      ref={ref}
      className={cn(
        "flex cursor-pointer select-none items-center gap-2 px-3 py-2 text-[0.85rem]",
        "outline-none transition-colors duration-fast ease-editorial",
        "data-[highlighted]:bg-ink data-[highlighted]:text-paper",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40",
        destructive && "text-oxide data-[highlighted]:bg-oxide",
        className,
      )}
      {...props}
    />
  );
});
