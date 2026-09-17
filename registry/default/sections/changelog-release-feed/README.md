# Changelog Release Feed

A chronological release notes section highlighting version bumps, features, breaking changes, and bug fixes.

## Install

```bash
openui add changelog-release-feed
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `changelog`
- Interaction model: `changelog-release-feed-interaction`
- Visual model: `changelog-release-feed-visual`
- Motion model: `subtle`
- Semantic purpose: `changelog-release-feed-section`

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
