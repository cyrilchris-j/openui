# User Feedback NPS Widget

A compact customer satisfaction widget featuring 0-10 Net Promoter Score selection and qualitative feedback field.

## Install

```bash
openui add user-feedback-nps-widget
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `feedback`
- Interaction model: `nps-score-rating-submission`
- Visual model: `compact-floating-feedback-panel`
- Motion model: `subtle`
- Semantic purpose: `customer-satisfaction-scoring`

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
