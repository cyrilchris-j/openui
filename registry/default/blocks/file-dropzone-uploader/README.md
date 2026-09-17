# File Dropzone Uploader

A drag-and-drop file staging area with visual dropzone, active upload progress, and file list preview.

## Install

```bash
openui add file-dropzone-uploader
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `files`
- Interaction model: `drag-and-drop-upload-staging`
- Visual model: `dashed-dropzone-progress-tray`
- Motion model: `subtle`
- Semantic purpose: `file-upload-pipeline`

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
