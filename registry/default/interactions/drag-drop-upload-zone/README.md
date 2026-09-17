# Drag Drop Upload Zone

A drag-and-drop file receiver highlighting boundary edges with dashed active indicators on file dragover.

## Install

```bash
openui add drag-drop-upload-zone
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `drag`
- Interaction model: `drag-over-boundary-detection`
- Visual model: `dashed-dropzone-chassis`
- Motion model: `instantaneous-border-state-shift`
- Semantic purpose: `file-drop-receiver`

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
