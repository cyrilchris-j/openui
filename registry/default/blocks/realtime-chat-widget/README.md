# Realtime Chat Widget

A floating customer support chat widget with interactive conversation history and agent availability.

## Install

```bash
openui add realtime-chat-widget
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `messaging`
- Interaction model: `chat-modal-message-input`
- Visual model: `floating-support-chat-widget`
- Motion model: `subtle`
- Semantic purpose: `customer-support-chat`

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
