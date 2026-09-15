# Class Name Merge (`cn`)

The single shared helper of the registry. It is a dependency of almost every
other resource, which is why it is installed automatically.

## Usage

```tsx
import { cn } from "@/lib/cn";

<div className={cn("border border-line", isActive && "border-oxide", className)} />
```

## Why not just template strings?

Template strings concatenate; `cn` **resolves**. `cn("p-2", "p-4")` yields
`p-4`, so a component's default padding can be replaced instead of duplicated.
That is what makes every registry resource overridable via `className` without
`!important` or prop soup.

## Notes

- Lists, `undefined`, `false` and `null` are ignored — `condition && "class"` is safe.
- No runtime cost beyond a `Set` lookup per class.
- License: MIT.
