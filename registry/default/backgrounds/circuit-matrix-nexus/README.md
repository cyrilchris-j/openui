# Circuit Matrix Nexus

Glowing cyan/emerald circuit junction nodes pulsing at critical power grid intersections.

## Install

```bash
openui add circuit-matrix-nexus
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `backgrounds` → subcategory `ambient`
- Interaction model: `passive-nexus-glow`
- Visual model: `junction-node-matrix`
- Motion model: `subtle-nodal-pulse`
- Semantic purpose: `cybernetic-nexus-backdrop`

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
