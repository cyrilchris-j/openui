# Media Asset Gallery

A digital media library grid featuring thumbnail previews, resolution chips, and selection checkboxes.

## Install

```bash
openui add media-asset-gallery
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `media`
- Interaction model: `gallery-thumbnail-selection`
- Visual model: `responsive-image-asset-grid`
- Motion model: `subtle`
- Semantic purpose: `media-asset-management`

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
