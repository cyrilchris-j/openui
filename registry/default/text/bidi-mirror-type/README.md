# Bidi Mirror Type

A dual-direction type specimen: the same phrase rendered LTR and RTL simultaneously, with per-glyph mirroring toggle and automatic dir attribute handling — a working tool for checking internationalised typography.

## Install

```bash
openui add bidi-mirror-type
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `accessible`
- Interaction model: `toggle-mirror`
- Visual model: `dual-direction-render`
- Motion model: `none`
- Semantic purpose: `i18n-verification`

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
