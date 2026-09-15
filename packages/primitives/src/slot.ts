import { Slot as RadixSlot, Slottable } from "@radix-ui/react-slot";

/**
 * Slot.
 *
 * The composition primitive: it merges its own props onto whatever single child
 * it is given, which is how `asChild` works everywhere in the platform. This is
 * what lets `<Button asChild>` render `<a>` without duplicating the button's
 * logic or nesting an interactive element inside another one.
 *
 * `Slottable` is the companion for components with both an icon and a label:
 * it marks which child still receives the merged className when the component
 * is not using `asChild`.
 */
export const Root = RadixSlot;
export { Slottable };

export type SlotProps = React.ComponentPropsWithoutRef<typeof RadixSlot>;
