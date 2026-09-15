# Sticky Stack

Cards that pin and stack while scrolling.

## Props

| Prop     | Type     | Default | Notes                             |
| -------- | -------- | ------- | --------------------------------- |
| `offset` | `number` | `96`    | Top offset of the first card.     |
| `step`   | `number` | `14`    | Extra offset per card.            |
| `gap`    | `number` | `24`    | Space between cards.              |

## Notes

Pure CSS `position: sticky` with an additive offset per card — zero JavaScript
per scroll frame. Under 640px, and under reduced motion, the stack collapses to
a normal list so nothing is pinned on a short viewport.
