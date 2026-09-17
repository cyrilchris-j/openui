# Inbox Conversation Thread

A messaging conversation workspace with recipient headers, chat message bubbles, and rich message composer.

## Install

```bash
openui add inbox-conversation-thread
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `messaging`
- Interaction model: `chat-message-send-and-scroll`
- Visual model: `threaded-conversation-inbox`
- Motion model: `subtle`
- Semantic purpose: `direct-messaging-interface`

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
