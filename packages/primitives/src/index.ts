/**
 * Behaviour primitives.
 *
 * This package is a thin, deliberate layer over Radix UI. It exists so that the
 * rest of the platform — the website, the registry components and the docs — all
 * get the *same* accessible behaviour, and so that swapping or pinning a
 * dependency happens in one place instead of thirty.
 *
 * Two rules apply to everything exported here:
 *
 *  1. **No visual opinion.** Layout, colour and motion live in `@openui/ui`.
 *     A primitive that shipped a background colour would fight every theme.
 *  2. **No hidden focus traps.** Each primitive keeps Radix's focus management
 *     intact; nothing here calls `preventDefault` on keyboard events.
 */

export * as Dialog from "./dialog.js";
export * as DropdownMenu from "./dropdown-menu.js";
export * as Popover from "./popover.js";
export * as Select from "./select.js";
export * as Separator from "./separator.js";
export * as Slot from "./slot.js";
export * as Tabs from "./tabs.js";
export * as ToggleGroup from "./toggle-group.js";
export * as Tooltip from "./tooltip.js";
