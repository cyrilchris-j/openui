# Split Code Documentation

Stripe-style API documentation layout with prose documentation on left and companion code examples on right.

## Install

```bash
openui add split-code-documentation
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `prose-and-code-dual-scroll`
- Visual model: `stripe-style-api-docs`
- Motion model: `none`
- Semantic purpose: `api-reference-layout`

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
