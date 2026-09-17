# Wandering Gradient Type

A multi-stop gradient that drifts through the glyphs on a slow non-repeating noise path — background-position animated through keyframes that never land on the same offset twice in a row, so the colour never loops visibly.

## Install

```bash
openui add wandering-gradient-type
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `paint`
- Interaction model: `ambient-loop`
- Visual model: `clipped-gradient`
- Motion model: `non-repeating-position-path`
- Semantic purpose: `display-accent`

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
