# Editorial Heading

Display typography for page openings, section leads and manifesto statements.

## Props

| Prop       | Type                    | Default | Notes                                  |
| ---------- | ----------------------- | ------- | -------------------------------------- |
| `lead`     | `string`                | —       | Opening words, set in roman.            |
| `emphasis` | `string`                | —       | Closing words, set in italic oxide.     |
| `index`    | `string`                | —       | Mono label above the heading.           |
| `as`       | `h1 \| h2 \| h3`        | `h2`    | Heading level — keep the outline sane.  |
| `size`     | `sm \| md \| lg`        | `md`    | Fluid `clamp()` scale.                  |
| `rule`     | `boolean`               | `true`  | Hairline under the heading.             |

## Design notes

Set `--font-display` to a serif with real character (Instrument Serif, Newsreader,
Fraunces) and `--font-mono` for the index label. If the heading still looks
generic, the problem is the font, not the component.
