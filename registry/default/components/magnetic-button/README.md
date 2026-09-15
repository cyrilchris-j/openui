# Magnetic Button

A button that leans toward the pointer, with the movement clamped so the hit area
never moves.

## Install

```bash
openui add magnetic-button
```

No dependencies beyond React — the magnet is three lines of maths and one
`requestAnimationFrame`, so it costs less than importing an animation library
for a single control.

## Props

| Prop       | Type      | Default | Notes                                          |
| ---------- | --------- | ------- | ---------------------------------------------- |
| `strength` | `number`  | `16`    | Maximum travel in px. Over ~24px it feels loose. |
| `follow`   | `number`  | `0.22`  | Fraction of the pointer distance covered.       |
| `scale`    | `number`  | `1.015` | Scale while engaged.                            |
| `...rest`  | button    | —       | Every native `<button>` attribute is forwarded. |

## Accessibility

- The magnet is **disabled** under `prefers-reduced-motion: reduce`.
- Disabled on coarse pointers, so touch users never get a moving target.
- Keyboard focus moves nothing; the control behaves as a plain button.
- The transform is `translate3d`, so text stays on the pixel grid.

## Design notes

The magnet is a confirmation, not a decoration: it should be barely perceptible
at rest and obvious on approach. If you can see the button "float" while the
pointer is still, `strength` is too high.
