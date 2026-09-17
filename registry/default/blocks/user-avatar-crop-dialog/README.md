# User Avatar Crop Dialog

An image profile adjustment modal featuring zoom slider, orientation rotation, and circular masking.

## Install

```bash
openui add user-avatar-crop-dialog
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `settings`
- Interaction model: `avatar-zoom-and-crop-adjustment`
- Visual model: `circular-mask-cropper-dialog`
- Motion model: `subtle`
- Semantic purpose: `profile-image-customization`

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
