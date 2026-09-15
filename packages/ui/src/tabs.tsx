import * as React from "react";

import { Tabs as Primitive } from "@openui/primitives";
import { cn } from "@openui/utils";

/**
 * Tabs.
 *
 * Styled as an *index* rather than as pills: a row of tracked labels above a
 * rule, with the active item marked by a solid underline and full-contrast ink.
 * This is the same device as the catalogue's section navigation, which is what
 * makes the resource page feel like part of the archive.
 *
 * `Tabs` requires `defaultValue` and a `TabsList` with real `TabsTrigger`s —
 * there is no "tab set with no visible affordance" variant, because that widget
 * is unusable with a keyboard and invisible to anyone who cannot hover.
 */
export const Tabs = Primitive.Root;

export const TabsList = React.forwardRef<
  React.ComponentRef<typeof Primitive.List>,
  React.ComponentPropsWithoutRef<typeof Primitive.List>
>(function TabsList({ className, ...props }, ref) {
  return (
    <Primitive.List
      ref={ref}
      className={cn("flex flex-wrap items-stretch gap-x-6 border-b border-line", className)}
      {...props}
    />
  );
});

export const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof Primitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof Primitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <Primitive.Trigger
      ref={ref}
      className={cn(
        "relative -mb-px border-b-2 border-transparent pb-3 pt-1",
        "eyebrow text-graphite",
        "transition-colors duration-fast ease-editorial",
        "hover:text-ink",
        "data-[state=active]:border-ink data-[state=active]:text-ink",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
});

export const TabsContent = React.forwardRef<
  React.ComponentRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  return (
    <Primitive.Content
      ref={ref}
      className={cn(
        "pt-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
        className,
      )}
      {...props}
    />
  );
});
