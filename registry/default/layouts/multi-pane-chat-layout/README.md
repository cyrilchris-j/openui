# Multi Pane Chat Layout

Messaging shell: left conversation channel list, central message log, and right participant roster.

## Install

```bash
openui add multi-pane-chat-layout
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `chat-channel-communication`
- Visual model: `three-pane-chat-workspace`
- Motion model: `none`
- Semantic purpose: `team-chat-workspace`

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
