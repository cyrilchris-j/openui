# Split Text

Word-level reveal that keeps the text real.

## Props

| Prop       | Type              | Default | Notes                                  |
| ---------- | ----------------- | ------- | -------------------------------------- |
| `text`     | `string`          | —       | The sentence to reveal.                 |
| `stagger`  | `number`          | `48`    | ms between words.                       |
| `delay`    | `number`          | `0`     | ms before the first word.               |
| `duration` | `number`          | `620`   | ms per word.                            |
| `onView`   | `boolean`         | `false` | Reveal on scroll into view.             |

## Accessibility

- The wrapper carries `aria-label`, so the sentence is read once, correctly.
- Decorative spans are `aria-hidden`.
- Text stays selectable and findable — the words are real text nodes.
- Reduced motion renders the finished state with no transition.

## Design notes

Use it once per page, on the sentence that carries the argument. Repeating it
across a page turns a deliberate reveal into a loading animation.
