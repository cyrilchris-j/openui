# Interactive Quiz Onboarding

A multi-step guided recommendation questionnaire outputting tailored stack configurations.

## Install

```bash
openui add interactive-quiz-onboarding
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `onboarding`
- Interaction model: `interactive-quiz-onboarding-interaction`
- Visual model: `interactive-quiz-onboarding-visual`
- Motion model: `subtle`
- Semantic purpose: `interactive-quiz-onboarding-section`

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
