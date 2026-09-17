# Dictionary Headword

A full dictionary entry layout: headword with syllable breaks, IPA pronunciation, part-of-speech italics, numbered senses with semicolon-separated examples, and etymology in a hanging indent — all semantic definition-list markup.

## Install

```bash
openui add dictionary-headword
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `editorial`
- Interaction model: `static`
- Visual model: `lemma-entry-layout`
- Motion model: `none`
- Semantic purpose: `lexical-reference`

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
