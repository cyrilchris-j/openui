# Support FAQ Knowledge Hub

A customer documentation support hub featuring categorized topic tiles and instant search filtering.

## Install

```bash
openui add support-faq-knowledge-hub
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `support`
- Interaction model: `knowledge-base-topic-navigation`
- Visual model: `categorized-faq-hub-grid`
- Motion model: `subtle`
- Semantic purpose: `self-service-support-hub`

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
