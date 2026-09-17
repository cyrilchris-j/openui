# Split Editor Diff Viewer

Side-by-side code diff viewer layout with line number gutters and addition/deletion styling.

## Install

```bash
openui add split-editor-diff-viewer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `diff-line-gutter-inspection`
- Visual model: `dual-pane-diff-viewer`
- Motion model: `none`
- Semantic purpose: `code-diff-inspection-stage`

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
