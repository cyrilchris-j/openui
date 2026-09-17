# Support Ticket Dispatcher

A support request section pairing support channel cards with a quick message form.

## Install

```bash
openui add support-ticket-dispatcher
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `support`
- Interaction model: `support-ticket-dispatcher-interaction`
- Visual model: `support-ticket-dispatcher-visual`
- Motion model: `subtle`
- Semantic purpose: `support-ticket-dispatcher-section`

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
