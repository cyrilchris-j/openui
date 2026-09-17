# Vertical Kern Text

A label set in vertical writing mode with upright Latin glyphs and controlled letter spacing, for spines, rails and side navigation where horizontal space is the constraint.

## Install

```bash
openui add vertical-kern-text
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `path`
- Interaction model: `static`
- Visual model: `writing-mode-vertical`
- Motion model: `none`
- Semantic purpose: `section-label`

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
