# CTA Closing Billboard

A monumental high-impact conversion stage at the base of the page with quickstart commands.

## Install

```bash
openui add cta-closing-billboard
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `cta`
- Interaction model: `cta-closing-billboard-interaction`
- Visual model: `cta-closing-billboard-visual`
- Motion model: `subtle`
- Semantic purpose: `cta-closing-billboard-section`

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
