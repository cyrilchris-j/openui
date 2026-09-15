import * as RadixToggleGroup from "@radix-ui/react-toggle-group";

/**
 * Toggle group.
 *
 * A row of mutually-exclusive or multi-select buttons, which is what the
 * playground's control panel and the catalogue's view switcher are. It is *not*
 * a segmented control visually — `@openui/ui`'s `SegmentedControl` styles over
 * this primitive when the options are few and the choice is mode-like.
 *
 * Radix keeps arrow-key navigation inside the group and manages the
 * `aria-pressed` state; `type="single"` and `type="multiple"` are genuinely
 * different widgets, so the component that wraps this requires the type
 * explicitly rather than defaulting.
 */
export const Root = RadixToggleGroup.Root;
export const Item = RadixToggleGroup.Item;

export type RootProps = RadixToggleGroup.ToggleGroupSingleProps;
