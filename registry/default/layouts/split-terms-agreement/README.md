# Split Terms Agreement

Legal consent layout: scrollable terms of service text on left with consent checkbox action box on right.

## Install

```bash
openui add split-terms-agreement
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `legal-consent-review`
- Visual model: `scrollable-terms-and-consent`
- Motion model: `none`
- Semantic purpose: `terms-agreement-dialog`

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
