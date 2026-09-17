# Customer Support Call Scheduler

A VIP technical consultation reservation block with timezone selection and instant calendar invitation dispatch.

## Install

```bash
openui add customer-support-call-scheduler
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `support`
- Interaction model: `support-call-slot-reservation`
- Visual model: `consultation-booking-card`
- Motion model: `subtle`
- Semantic purpose: `vip-support-consultation-booking`

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
