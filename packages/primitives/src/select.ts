import * as RadixSelect from "@radix-ui/react-select";

/**
 * Select.
 *
 * A custom-styled listbox, not a native `<select>`. That trade is made
 * deliberately and only where the design requires it (a native select cannot be
 * styled consistently across platforms): Radix preserves the full keyboard
 * model — arrow keys, Home/End, type-ahead — and the ARIA wiring.
 *
 * `Value` is what a form reads; `ItemText` exists because the visible label and
 * the submitted value are frequently different (a design-system name and its
 * slug, for example).
 *
 * For short, binary or mode-like choices prefer `@openui/ui`'s `SegmentedControl`
 * or a radio group, which are easier to scan than a dropdown.
 */
export const Root = RadixSelect.Root;
export const Trigger = RadixSelect.Trigger;
export const Value = RadixSelect.Value;
export const Icon = RadixSelect.Icon;
export const Portal = RadixSelect.Portal;
export const Content = RadixSelect.Content;
export const Viewport = RadixSelect.Viewport;
export const Item = RadixSelect.Item;
export const ItemText = RadixSelect.ItemText;
export const ItemIndicator = RadixSelect.ItemIndicator;
export const Group = RadixSelect.Group;
export const Label = RadixSelect.Label;
export const Separator = RadixSelect.Separator;
export const ScrollUpButton = RadixSelect.ScrollUpButton;
export const ScrollDownButton = RadixSelect.ScrollDownButton;

export type RootProps = RadixSelect.SelectProps;
