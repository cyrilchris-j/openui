import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";

/**
 * Dropdown menu.
 *
 * A menu is not a list of links — it is a list of *commands*. Radix gives it
 * roving focus, type-ahead and correct `role="menu"` semantics; the platform
 * uses it for account actions, sort controls and row operations, never for
 * navigation that would be better served by plain links.
 *
 * `Item` is keyboard-activatable and must not be a link inside a menu; for
 * navigation use `Item asChild` around an anchor, which keeps the menu keymap
 * while preserving the link's semantics.
 */
export const Root = RadixDropdownMenu.Root;
export const Trigger = RadixDropdownMenu.Trigger;
export const Portal = RadixDropdownMenu.Portal;
export const Content = RadixDropdownMenu.Content;
export const Item = RadixDropdownMenu.Item;
export const CheckboxItem = RadixDropdownMenu.CheckboxItem;
export const RadioGroup = RadixDropdownMenu.RadioGroup;
export const RadioItem = RadixDropdownMenu.RadioItem;
export const Label = RadixDropdownMenu.Label;
export const Separator = RadixDropdownMenu.Separator;
export const Group = RadixDropdownMenu.Group;

export type ContentProps = RadixDropdownMenu.DropdownMenuContentProps;
