import * as RadixDialog from "@radix-ui/react-dialog";

/**
 * Dialog.
 *
 * Radix handles the parts that are easy to get wrong: focus is moved into the
 * content on open and returned to the trigger on close, Escape closes, and the
 * background becomes inert to both pointer and assistive technology.
 *
 * What each part is *for*, because the names are easy to confuse:
 *  - `Trigger` opens it. A `<button>`, always.
 *  - `Portal` renders outside the DOM hierarchy so a transformed ancestor
 *    cannot clip a fixed-position overlay.
 *  - `Overlay` is the backdrop. It is decorative; it gets `aria-hidden`.
 *  - `Title` and `Description` are **required** — without them every screen
 *    reader announces "dialog" and nothing else.
 *  - `Close` is an explicit dismiss control. Escape is not sufficient on its own.
 */
export const Root = RadixDialog.Root;
export const Trigger = RadixDialog.Trigger;
export const Portal = RadixDialog.Portal;
export const Overlay = RadixDialog.Overlay;
export const Content = RadixDialog.Content;
export const Title = RadixDialog.Title;
export const Description = RadixDialog.Description;
export const Close = RadixDialog.Close;

export type RootProps = RadixDialog.DialogProps;
