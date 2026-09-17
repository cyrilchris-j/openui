# Ink Underline Draw

Link underline drawn like a felt-tip stroke: an SVG path whose stroke-dashoffset animates left-to-right with a hand-drawn wobble, thicker in the middle, retraced in reverse when the pointer leaves.

## Install

```bash
openui add ink-underline-draw
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `hover-draw`
- Visual model: `svg-stroke-decoration`
- Motion model: `dash-offset-trace`
- Semantic purpose: `link-emphasis`

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
