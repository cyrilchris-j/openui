# Community Forum Digest

A snapshot of top community forum threads with author avatars, response counts, and upvotes.

## Install

```bash
openui add community-forum-digest
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `community`
- Interaction model: `community-forum-digest-interaction`
- Visual model: `community-forum-digest-visual`
- Motion model: `subtle`
- Semantic purpose: `community-forum-digest-section`

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
