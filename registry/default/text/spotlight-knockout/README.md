# Spotlight Knockout

A wall of dark type with a spotlight hole punched through it: the headline sits underneath and is only legible inside a radial mask that tracks the pointer — reading becomes a searchlight act.

## Install

```bash
openui add spotlight-knockout
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `pointer-mask-follow`
- Visual model: `knockout-overlay`
- Motion model: `direct-follow`
- Semantic purpose: `curiosity-heading`

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
