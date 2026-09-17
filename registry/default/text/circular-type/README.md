# Circular Type

Text set on an SVG circular path that rotates continuously while the centre stays readable — a seal or stamp composition, with circumference-matched font sizing so the ring always closes cleanly.

## Install

```bash
openui add circular-type
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `path`
- Interaction model: `ambient-loop`
- Visual model: `svg-path-glyphs`
- Motion model: `orbit-rotation`
- Semantic purpose: `badge-statement`

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
