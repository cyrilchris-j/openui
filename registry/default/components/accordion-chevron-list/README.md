# Accordion Chevron List

A vertical list of stacked question and answer disclosures with animated chevron indicators.

## Install

```bash
openui add accordion-chevron-list
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `accordion-chevron-toggle`
- Visual model: `stacked-ruled-disclosures`
- Motion model: `stepwise-content-expansion`
- Semantic purpose: `faq-disclosure-stack`

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
