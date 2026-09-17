# Split Auth Layout

Authentication layout with graphic mural banner on one side and clean authentication dialog on the other.

## Install

```bash
openui add split-auth-layout
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `authentication-flow-split`
- Visual model: `mural-and-auth-form`
- Motion model: `none`
- Semantic purpose: `authentication-screen-shell`

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
