# Numeric Spinner Input

A text field with integrated stepper chevron buttons for integer increments.

## Install

```bash
openui add numeric-spinner-input
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `controls`
- Interaction model: `spinner-stepper-entry`
- Visual model: `chevron-stepper-box`
- Motion model: `none`
- Semantic purpose: `numeric-spinner-field`

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
