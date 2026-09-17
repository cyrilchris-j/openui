# Feed Stream Layout

Three-column social feed layout with central chronological stream flanked by navigation and trends.

## Install

```bash
openui add feed-stream-layout
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `social-stream-timeline`
- Visual model: `central-feed-flanked-rails`
- Motion model: `none`
- Semantic purpose: `chronological-stream-shell`

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
