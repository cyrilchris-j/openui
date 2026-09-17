# CTA Conversion Billboard

High-contrast conversion billboard banner with clear headline, dual action triggers, and guarantee badge.

## Install

```bash
openui add cta-conversion-billboard
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `cta`
- Interaction model: `conversion-billboard-dispatch`
- Visual model: `centered-billboard-banner`
- Motion model: `none`
- Semantic purpose: `bottom-page-conversion-billboard`

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
