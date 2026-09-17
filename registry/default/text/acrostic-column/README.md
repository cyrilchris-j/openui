# Acrostic Column

A poem whose initial letters spell a hidden word down the left edge: the initials column is emphasised, hovering it lights the full acrostic, and a reveal toggle confirms the message — a medieval device implemented as a responsive layout.

## Install

```bash
openui add acrostic-column
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `hover-reveal-message`
- Visual model: `initials-column-lockup`
- Motion model: `column-illumination`
- Semantic purpose: `hidden-message`

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
