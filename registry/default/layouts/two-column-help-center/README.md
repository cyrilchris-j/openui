# Two Column Help Center

Knowledge base layout with categorical help directories on left and popular FAQ articles on right.

## Install

```bash
openui add two-column-help-center
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `knowledgebase-category-navigation`
- Visual model: `category-aside-and-article-rack`
- Motion model: `none`
- Semantic purpose: `help-center-portal-layout`

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
