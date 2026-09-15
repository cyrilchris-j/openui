import * as RadixTooltip from "@radix-ui/react-tooltip";

/**
 * Tooltip.
 *
 * Use a tooltip to *name* a control that is already visible — an icon-only
 * button, an abbreviated metric. Do not use it to hold information the user
 * needs to complete a task: tooltips are unavailable to touch users, they
 * disappear on scroll, and they are announced inconsistently.
 *
 * `Provider` is exported because Radix shares open/close timing across a group
 * of tooltips; render it once near the root, not around every tooltip, or the
 * delay-skip behaviour is lost.
 *
 * The wrapper in `@openui/ui` sets `delayDuration` and a portal target so that
 * tooltips are never clipped by an `overflow: hidden` ancestor.
 */
export const Provider = RadixTooltip.Provider;
export const Root = RadixTooltip.Root;
export const Trigger = RadixTooltip.Trigger;
export const Portal = RadixTooltip.Portal;
export const Content = RadixTooltip.Content;
export const Arrow = RadixTooltip.Arrow;

export type ContentProps = RadixTooltip.TooltipContentProps;
