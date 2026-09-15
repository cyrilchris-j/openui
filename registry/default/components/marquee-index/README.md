# Marquee Index

An infinite ticker for resource indexes, category rails and release strips.

## Props

| Prop        | Type                        | Default | Notes                                    |
| ----------- | --------------------------- | ------- | ---------------------------------------- |
| `items`     | `readonly string[]`         | —       | Rendered as monospace uppercase labels.  |
| `duration`  | `number`                    | `32`    | Seconds per pass, at any content width.  |
| `direction` | `"left" \| "right"`         | `left`  | Travel direction.                        |
| `separator` | `ReactNode`                 | `/`     | Passed between items.                    |

## Accessibility

- `role="marquee"` with an explicit label.
- Pauses on hover **and** `focus-within`, so links inside stay reachable.
- `prefers-reduced-motion: reduce` turns the ticker into a scrollable list.
  Content is never hidden behind motion.

## Design notes

The ticker is a rail: it should read as a hairline band of type between two
sections, not as a hero. Keep the type monospace and small, and never animate it
faster than ~40s per pass — anything quicker reads as advertising.
