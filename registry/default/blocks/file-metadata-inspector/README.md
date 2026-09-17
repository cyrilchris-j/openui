# File Metadata Inspector

A binary file inspector drawer presenting MIME types, SHA-256 integrity checksums, and dimensions.

## Install

```bash
openui add file-metadata-inspector
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `files`
- Interaction model: `metadata-inspection-and-hash-copy`
- Visual model: `asset-properties-sidebar`
- Motion model: `none`
- Semantic purpose: `file-integrity-verification`

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
