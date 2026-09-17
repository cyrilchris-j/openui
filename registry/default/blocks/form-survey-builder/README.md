# Form Survey Builder

An interactive questionnaire block with multi-type questions, progress tracking, and submission summaries.

## Install

```bash
openui add form-survey-builder
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `forms`
- Interaction model: `survey-question-response-flow`
- Visual model: `card-based-survey-wizard`
- Motion model: `subtle`
- Semantic purpose: `customer-survey-collection`

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
