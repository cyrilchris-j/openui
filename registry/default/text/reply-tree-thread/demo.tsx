import { ReplyTreeThread } from "./reply-tree-thread";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <ReplyTreeThread
        root={{
          id: "1",
          author: "mira",
          text: "Should registries validate at build time?",
          replies: [
            {
              id: "2",
              author: "dev",
              text: "Yes — CI is the only place with real context.",
              replies: [{ id: "3", author: "sam", text: "Agreed, runtime checks are too late." }],
            },
            { id: "4", author: "ana", text: "Both: cheap checks runtime, deep checks in CI." },
          ],
        }}
        className="w-full max-w-lg"
      />
    </div>
  );
}
