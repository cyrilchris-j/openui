# Split Login Card

Contained authentication card with left branded illustration and right social/email form.

## Install

```bash
openui add split-login-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `contained-auth-split`
- Visual model: `compact-split-auth-card`
- Motion model: `none`
- Semantic purpose: `login-card-container`

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
