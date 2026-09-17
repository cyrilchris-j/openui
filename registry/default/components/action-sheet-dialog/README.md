# Action Sheet Dialog

A bottom action sheet confirmation overlay displaying a list of options with a separate cancel button.

## Install

```bash
openui add action-sheet-dialog
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `overlays`
- Interaction model: `action-sheet-modal-selection`
- Visual model: `docked-action-options`
- Motion model: `none`
- Semantic purpose: `confirmation-action-sheet`

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
