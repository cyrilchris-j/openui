# Smart Form Input Validator

A live form field validator displaying real-time feedback for password strength, email formatting, and slug syntax.

## Install

```bash
openui add smart-form-input-validator
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `forms`
- Interaction model: `live-input-schema-validation`
- Visual model: `interactive-form-validator-card`
- Motion model: `subtle`
- Semantic purpose: `client-side-form-validation`

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
