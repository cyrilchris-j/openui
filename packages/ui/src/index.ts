/**
 * The OpenUI component set.
 *
 * These are the *platform's own* components — the ones the website, the docs and
 * the admin console are built from. They are deliberately different from the
 * resource registry: a registry component is distributed to consumers as source
 * they own, while these are internal and may change.
 *
 * A note on the boundary, because it is the most common source of drift: if a
 * component is only used once on one page, it belongs in that feature's folder,
 * not here. This package holds what at least two surfaces share.
 */

export { cn } from "@openui/utils";

export * from "./button.js";
export * from "./input.js";
export * from "./textarea.js";
export * from "./label.js";
export * from "./badge.js";
export * from "./card.js";
export * from "./separator.js";
export * from "./tabs.js";
export * from "./dialog.js";
export * from "./dropdown-menu.js";
export * from "./tooltip.js";
export * from "./segmented-control.js";
export * from "./status-pill.js";
export * from "./copy-button.js";
export * from "./empty-state.js";
export * from "./skeleton.js";
export * from "./visually-hidden.js";
