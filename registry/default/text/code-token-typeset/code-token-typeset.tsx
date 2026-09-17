import { cn } from "@/lib/cn";

export interface CodeTokenTypesetProps {
  children: string;
  className?: string;
}

type Token = { kind: "keyword" | "string" | "comment" | "number" | "plain"; text: string };

const KEYWORDS = new Set(["const", "let", "function", "return", "import", "export", "default", "from", "if", "else", "type"]);

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /(\/\/[^\n]*)|("[^"]*"|'[^']*'|`[^`]*`)|(\b\d[\d_.]*\b)|(\b[a-zA-Z_$][\w$]*\b)|(\s+)|(.)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    const [raw, comment, str, num, word] = match;
    if (comment) tokens.push({ kind: "comment", text: raw });
    else if (str) tokens.push({ kind: "string", text: raw });
    else if (num) tokens.push({ kind: "number", text: raw });
    else if (word) tokens.push({ kind: KEYWORDS.has(word) ? "keyword" : "plain", text: raw });
    else tokens.push({ kind: "plain", text: raw });
  }
  return tokens;
}

const STYLES: Record<Token["kind"], string> = {
  keyword: "text-accent font-semibold",
  string: "text-emerald-700",
  comment: "text-ink/40 italic",
  number: "text-blue-700 tabular-nums",
  plain: "",
};

export function CodeTokenTypeset({ children, className }: CodeTokenTypesetProps) {
  const tokens = tokenize(children);

  return (
    <code
      className={cn("rounded bg-line/30 px-1.5 py-0.5 font-mono text-[0.9em]", className)}
      role="code"
    >
      {tokens.map((token, index) => (
        <span key={index} className={STYLES[token.kind]}>
          {token.text}
        </span>
      ))}
    </code>
  );
}

export default CodeTokenTypeset;
