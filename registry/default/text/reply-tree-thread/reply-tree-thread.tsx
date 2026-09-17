"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ThreadNode {
  id: string;
  author: string;
  text: string;
  replies?: ThreadNode[];
}

export interface ReplyTreeThreadProps {
  root: ThreadNode;
  className?: string;
}

export function ReplyTreeThread({ root, className }: ReplyTreeThreadProps) {
  return (
    <div className={cn("text-sm", className)} role="tree" aria-label="Discussion thread">
      <Node node={root} depth={0} />
    </div>
  );
}

function countReplies(node: ThreadNode): number {
  return (node.replies ?? []).reduce((sum, reply) => sum + 1 + countReplies(reply), 0);
}

function Node({ node, depth }: { node: ThreadNode; depth: number }) {
  const [open, setOpen] = useState(depth < 2);
  const replies = node.replies ?? [];
  const hasReplies = replies.length > 0;

  return (
    <div role="treeitem" aria-expanded={hasReplies ? open : undefined} className="relative">
      <div className="flex items-start gap-2 py-1.5">
        {depth > 0 && <span aria-hidden className="mt-1 h-4 w-4 shrink-0 rounded-bl border-b border-l border-line" />}
        <div className="min-w-0 flex-1">
          <p className="text-ink">
            <span className="mr-2 font-semibold text-accent">{node.author}</span>
            {node.text}
          </p>
          {hasReplies && (
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              className="mt-1 font-mono text-xs text-ink/60 hover:text-ink"
            >
              {open ? "− hide" : `+ ${countReplies(node)} repl${countReplies(node) === 1 ? "y" : "ies"}`}
            </button>
          )}
        </div>
      </div>
      {open && hasReplies && (
        <div className="ml-4 border-l border-line pl-4" role="group">
          {replies.map((reply) => (
            <Node key={reply.id} node={reply} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReplyTreeThread;
