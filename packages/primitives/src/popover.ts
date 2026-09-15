import * as RadixPopover from "@radix-ui/react-popover";

/**
 * Popover.
 *
 * A popover holds *interactive* content — a filter form, a share field, a token
 * picker. For a non-interactive hint use `Tooltip` instead: a popover is
 * focusable and keeps the user's attention until dismissed, which is the wrong
 * trade for a label.
 *
 * `Anchor` is exported separately so the panel can be positioned against an
 * element other than the trigger, which is what a "row actions" control needs.
 */
export const Root = RadixPopover.Root;
export const Trigger = RadixPopover.Trigger;
export const Anchor = RadixPopover.Anchor;
export const Portal = RadixPopover.Portal;
export const Content = RadixPopover.Content;
export const Arrow = RadixPopover.Arrow;
export const Close = RadixPopover.Close;

export type ContentProps = RadixPopover.PopoverContentProps;
