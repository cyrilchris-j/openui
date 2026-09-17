# Edge Cache Purge Console

A global CDN cache invalidator with URL path targeting, tag-based purging, and execution verification logs.

## Install

```bash
openui add edge-cache-purge-console
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `cache-invalidation-path-purge`
- Visual model: `cdn-purge-action-card`
- Motion model: `none`
- Semantic purpose: `cdn-edge-cache-invalidation`

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
