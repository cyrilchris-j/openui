# Variable Weight Text

Per-glyph font-variation weight driven by distance to the pointer, so the word swells under the cursor like a pressure field; falls back to a static mid weight without a pointer.

## Install

```bash
openui add variable-weight-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `pointer-proximity-weight`
- Visual model: `axis-animation`
- Motion model: `distance-falloff`
- Semantic purpose: `display-statement`

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
