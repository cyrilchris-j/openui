# Glyph Flock Text

Letters behave as boids: each glyph steers away from the pointer within its influence radius and eases back to its baseline slot when the pointer leaves, giving the headline a startled-school-of-fish quality.

## Install

```bash
openui add glyph-flock-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `pointer-repel`
- Visual model: `displaced-glyph-spans`
- Motion model: `flee-and-settle`
- Semantic purpose: `playful-heading`

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
