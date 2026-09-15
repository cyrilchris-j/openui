# Swiss Editorial

A design system, not a theme: the tokens are its compiled form and `design.md`
is the source of truth that people and AI tools read before generating anything.

## Install

```bash
openui theme add swiss-editorial
```

```ts
import "@/styles/swiss-editorial.css";
```

## What it fixes

| Axis            | Position                                              |
| --------------- | ----------------------------------------------------- |
| Genre           | Editorial                                             |
| Macrostructure  | Asymmetric (7/5)                                      |
| Density         | Airy                                                  |
| Shape           | Sharp (0–2px)                                         |
| Motion          | Subtle (180 / 320 / 600ms)                            |
| Typography      | Display serif + grotesk + mono                        |
| Colour          | High contrast, one accent                             |

## Using it with AI tools

Point your agent at the installed `design.md`:

```bash
openui design pull swiss-editorial   # writes .openui/design.md
```

Then include it in the prompt context. The rules exist so that generation starts
from a position rather than from defaults.

## Fingerprint

Distinctiveness **78/100**. Strongest: display serif, asymmetric composition.
Weakest: airy density alone does not differentiate — the type has to carry it.
