# Kinetic Ticker

A rotating phrase inside a sentence.

## Props

| Prop       | Type                | Default | Notes                                    |
| ---------- | ------------------- | ------- | ---------------------------------------- |
| `phrases`  | `readonly string[]` | —       | Ordered list of alternatives.             |
| `interval` | `number`            | `2200`  | ms per phrase.                            |
| `prefix`   | `string`            | —       | Words before the rotating phrase.         |
| `suffix`   | `string`            | —       | Words after (punctuation usually).        |

## Engineering notes

- The longest phrase is rendered invisibly to reserve width — no layout shift.
- The interval stops when `document.hidden`, so background tabs stay idle.
- Reduced motion shows the first phrase; all phrases are exposed via `sr-only`.

## Design notes

Use it inside a sentence, not as a headline. Give it one accent colour and let
the surrounding type stay neutral.
