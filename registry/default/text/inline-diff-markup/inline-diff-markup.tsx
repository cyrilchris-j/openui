import { cn } from "@/lib/cn";

export interface InlineDiffMarkupProps {
  before: string;
  after: string;
  className?: string;
}

type Op = { type: "same" | "insert" | "delete"; word: string };

/** Word-level longest-common-subsequence diff. */
export function diffWords(before: string, after: string): Op[] {
  const a = before.split(/\s+/);
  const b = after.split(/\s+/);
  const lcs: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = a.length - 1; i >= 0; i--) {
    for (let j = b.length - 1; j >= 0; j--) {
      lcs[i]![j] = a[i] === b[j] ? (lcs[i + 1]?.[j + 1] ?? 0) + 1 : Math.max(lcs[i + 1]?.[j] ?? 0, lcs[i]?.[j + 1] ?? 0);
    }
  }

  const ops: Op[] = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      ops.push({ type: "same", word: a[i]! });
      i++;
      j++;
    } else if ((lcs[i + 1]?.[j] ?? 0) >= (lcs[i]?.[j + 1] ?? 0)) {
      ops.push({ type: "delete", word: a[i]! });
      i++;
    } else {
      ops.push({ type: "insert", word: b[j]! });
      j++;
    }
  }
  while (i < a.length) {
    ops.push({ type: "delete", word: a[i]! });
    i++;
  }
  while (j < b.length) {
    ops.push({ type: "insert", word: b[j]! });
    j++;
  }
  return ops;
}

export function InlineDiffMarkup({ before, after, className }: InlineDiffMarkupProps) {
  const ops = diffWords(before, after);

  return (
    <p className={cn("max-w-prose font-mono text-sm leading-loose", className)} role="doc-diff">
      {ops.map((op, index) => {
        if (op.type === "same") return <span key={index}>{op.word} </span>;
        if (op.type === "insert") {
          return (
            <span key={index} className="rounded-sm bg-emerald-500/10 px-0.5 text-emerald-700 underline decoration-emerald-500 decoration-2">
              {op.word}{" "}
            </span>
          );
        }
        return (
          <span key={index} className="rounded-sm bg-red-500/10 px-0.5 text-red-700 line-through decoration-red-500 decoration-2" aria-label={`deleted: ${op.word}`}>
            {op.word}{" "}
          </span>
        );
      })}
    </p>
  );
}

export default InlineDiffMarkup;
