# FAQ Accordion Stack

Centered frequently asked questions layout with tidy stacked disclosure containers.

## Install

```bash
openui add faq-accordion-stack
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `stacks`
- Interaction model: `faq-disclosure-stack`
- Visual model: `stacked-question-panels`
- Motion model: `none`
- Semantic purpose: `faq-disclosure-layout`

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
