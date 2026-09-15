import * as RadixSeparator from "@radix-ui/react-separator";

/**
 * Separator.
 *
 * The only primitive here with no interaction, and the one most often used
 * wrongly: a separator is *semantic* (`role="separator"`), so it must only be
 * used where a division genuinely exists. Two stacked cards with a gap between
 * them are already separate — drawing a rule between them adds noise and a
 * meaningless landmark for a screen-reader user.
 *
 * Use it for a real change of subject inside one container: a toolbar's
 * sections, a menu's groups, a definition list's entries.
 */
export const Root = RadixSeparator.Root;
