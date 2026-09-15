# Segmented Control

A single-choice switcher for preview density, code flavour, view mode and similar.

## Props

| Prop            | Type                        | Notes                                     |
| --------------- | --------------------------- | ----------------------------------------- |
| `options`       | `SegmentedOption<T>[]`      | `value`, `label`, optional `description`.  |
| `value`         | `T`                         | Controlled value.                          |
| `defaultValue`  | `T`                         | Uncontrolled initial value.                |
| `onValueChange` | `(value: T) => void`        | Fires on click and on arrow key.           |
| `label`         | `string`                    | Required — accessible name for the group.  |

## Accessibility

- `role="radiogroup"` with `role="radio"` children and `aria-checked`.
- Roving tabindex: one tab stop, arrow keys move and select.
- Segments with icons or abbreviations should set `description`.

## Design notes

Segments share borders and never float. Avoid pills here: a radiogroup is a
switch, and switches in this language are square.
