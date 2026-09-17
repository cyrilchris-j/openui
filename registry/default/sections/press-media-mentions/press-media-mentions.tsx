"use client";

import { cn } from "@/lib/cn";

export interface PressMediaMentionsProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function PressMediaMentions({
  title = "In the News",
  className,
  ...props
}: PressMediaMentionsProps) {
  const articles = [
    { pub: "TECHCRUNCH", quote: "“The open-source design registry rewriting how autonomous AI teams build interfaces.”" },
    { pub: "HACKER NEWS", quote: "“Zero-dependency code with mathematical rigor. This is how component libraries should work.”" },
    { pub: "WIRED", quote: "“Bringing fingerprint character and visual delight back to modern software.”" },
  ];

  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl font-bold font-serif text-center text-ink mb-10">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((a) => (
          <div key={a.pub} className="p-6 rounded-2xl border border-line bg-paper flex flex-col justify-between shadow-xs">
            <blockquote className="font-serif text-xs leading-relaxed text-ink/80 italic mb-4">
              {a.quote}
            </blockquote>
            <span className="font-mono text-[11px] font-bold text-accent tracking-wider">{a.pub}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
