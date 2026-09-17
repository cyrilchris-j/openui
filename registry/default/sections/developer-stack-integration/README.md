# Developer Stack Integration

An ecosystem compatibility grid showing native integration with Next.js, Vite, Tailwind v4, and React 19.

## Install

```bash
openui add developer-stack-integration
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `ecosystem`
- Interaction model: `developer-stack-integration-interaction`
- Visual model: `developer-stack-integration-visual`
- Motion model: `subtle`
- Semantic purpose: `developer-stack-integration-section`

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
