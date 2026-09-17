# Newsletter Curated Digest

A subscription card offering weekly design engineering breakdowns and curated component patterns.

## Install

```bash
openui add newsletter-curated-digest
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `newsletter`
- Interaction model: `newsletter-curated-digest-interaction`
- Visual model: `newsletter-curated-digest-visual`
- Motion model: `subtle`
- Semantic purpose: `newsletter-curated-digest-section`

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
