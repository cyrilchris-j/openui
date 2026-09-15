# Asymmetric Hero

An opening section composed from typography and structure.

## Props

| Prop          | Type          | Notes                                    |
| ------------- | ------------- | ---------------------------------------- |
| `eyebrow`     | `string`      | Mono label above the statement.           |
| `statement`   | `ReactNode`   | The heading, rendered as `<h1>`.          |
| `supporting`  | `ReactNode`   | One short paragraph.                      |
| `facts`       | `HeroFact[]`  | Index rail: label/value pairs.            |
| `actions`     | `ReactNode`   | Buttons or links.                         |
| `rail`        | `ReactNode`   | Replace the facts rail entirely.          |

## Design notes

The rail is the identity of this hero: numbers, hairlines and monospace labels
on one side, a large serif statement on the other. Remove the monospace rail and
you are left with a standard hero — keep it.
