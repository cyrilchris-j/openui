# Interactive FAQ Filter

A categorized FAQ accordion with live category filtering and expand-collapse state memory.

## Install

```bash
openui add interactive-faq-filter
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `faq`
- Interaction model: `interactive-faq-filter-interaction`
- Visual model: `interactive-faq-filter-visual`
- Motion model: `subtle`
- Semantic purpose: `interactive-faq-filter-section`

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
