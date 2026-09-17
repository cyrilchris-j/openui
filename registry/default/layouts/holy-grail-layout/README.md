# Holy Grail Layout

Classic five-region web shell with header, persistent navigation sidebar, main content, contextual aside, and footer.

## Install

```bash
openui add holy-grail-layout
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `responsive-five-box-shell`
- Visual model: `holy-grail-wireframe`
- Motion model: `none`
- Semantic purpose: `application-root-shell`

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
