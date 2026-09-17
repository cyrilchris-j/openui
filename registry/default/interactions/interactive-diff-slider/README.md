# Interactive Diff Slider

A split before-and-after image comparator where dragging the vertical hairline scrubber reveals underlying differences.

## Install

```bash
openui add interactive-diff-slider
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `split-curtain-scrub`
- Visual model: `bisected-diff-frame`
- Motion model: `clip-path-linear-travel`
- Semantic purpose: `before-after-diff-slider`

## Accessibility

- Keyboard reachable; visible focus ring.
- Honours `prefers-reduced-motion`: animation is disabled or replaced with a
  static state change.
- Semantic HTML first; ARIA only where the semantics need help.

## When to use

When the interface needs exactly this behaviour — check the fingerprint above
against the composition you are building.

## When not to use

When a simpler resource meets the need. Do not stack decorative motion on top
of a surface that already carries motion.
