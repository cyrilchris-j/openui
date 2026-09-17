# Interactive FAQ Accordion

Frequently asked questions section with tidy stacked disclosures and animated chevron toggles.

## Install

```bash
openui add interactive-faq-accordion
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `faq`
- Interaction model: `faq-disclosure-toggle`
- Visual model: `stacked-faq-panels`
- Motion model: `none`
- Semantic purpose: `faq-question-section`

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
