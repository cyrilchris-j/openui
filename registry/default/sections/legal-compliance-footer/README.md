# Legal Compliance Footer

A compact footer containing statutory copyright, license details, and compliance links.

## Install

```bash
openui add legal-compliance-footer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `navigation`
- Interaction model: `legal-compliance-footer-interaction`
- Visual model: `legal-compliance-footer-visual`
- Motion model: `subtle`
- Semantic purpose: `legal-compliance-footer-section`

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
