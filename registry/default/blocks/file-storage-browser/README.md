# File Storage Browser

A cloud asset manager with folder directory hierarchy, file size badges, and selection controls.

## Install

```bash
openui add file-storage-browser
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `files`
- Interaction model: `directory-navigation-and-file-selection`
- Visual model: `hierarchical-asset-file-explorer`
- Motion model: `none`
- Semantic purpose: `cloud-storage-file-management`

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
