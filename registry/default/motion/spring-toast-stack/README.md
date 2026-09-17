# Spring Toast Stack

A cascade of alert cards stacked behind one another that eject smoothly when dismissed using hookean spring dynamics.

## Install

```bash
openui add spring-toast-stack
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `notifications`
- Interaction model: `dismiss-eject-card`
- Visual model: `cascading-deck-toasts`
- Motion model: `spring-ejection-flyaway`
- Semantic purpose: `stacked-alert-feed`

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
