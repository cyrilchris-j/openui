# Cursor Trail

An eased pointer trail with a fixed node pool.

## Props

| Prop    | Type     | Default | Notes                          |
| ------- | -------- | ------- | ------------------------------ |
| `count` | `number` | `18`    | Recycled dots (12–30 works).   |
| `ease`  | `number` | `0.32`  | Follow factor, 0–1.            |
| `size`  | `number` | `6`     | Dot diameter in px.            |

## Constraints

- Disabled on coarse pointers and under `prefers-reduced-motion`.
- The layer is `aria-hidden` and `pointer-events: none` — it never blocks input.
- The frame loop stops after ~40 idle frames and while the tab is hidden.

## Design notes

A trail is a signature, so use one and use it once. It should read as a soft
afterimage of the pointer, never as confetti.
