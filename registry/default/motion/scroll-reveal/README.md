# Scroll Reveal

One-shot reveal on scroll, staggered for child items.

## Props

| Prop        | Type                  | Default   | Notes                          |
| ----------- | --------------------- | --------- | ------------------------------ |
| `stagger`   | `number`              | `80`      | ms between children.           |
| `duration`  | `number`              | `560`     | ms per element.                |
| `distance`  | `number`              | `18`      | px of travel.                  |
| `threshold` | `number`              | `0.2`     | Visibility needed to trigger.  |
| `mode`      | `block \| children`   | `block`   | What animates.                 |

Wrap children in `<ScrollRevealItem index={n} />` for staggering.

## Notes

Reveals once and disconnects the observer. Content is visible without
JavaScript; the animation is additive, never a gate.
