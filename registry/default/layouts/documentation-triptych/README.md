# Documentation Triptych

Three-pane technical documentation layout: directory tree sidebar, main article, and table of contents rail.

## Install

```bash
openui add documentation-triptych
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `three-pane-doc-navigation`
- Visual model: `triptych-doc-wireframe`
- Motion model: `none`
- Semantic purpose: `documentation-site-shell`

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
