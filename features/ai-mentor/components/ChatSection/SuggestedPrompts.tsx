import { RefreshCw } from "lucide-react";

import { suggestedPrompts } from "../../data/ai-mentorData";

export default function SuggestedPrompts() {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-medium text-white">
          Suggested prompts
        </h2>

        <button
          type="button"
          className="flex items-center gap-2 text-sm text-violet-400 transition hover:text-violet-300"
        >
          <RefreshCw className="size-4" />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            className="
              flex min-h-28 items-start
              rounded-xl
              border border-white/10
              bg-slate-950/40
              p-4
              text-left
              text-sm leading-6 text-slate-300
              transition-all duration-200
              hover:border-violet-500/30
              hover:bg-violet-500/5
              hover:text-white
            "
          >
            {prompt}
          </button>
        ))}
      </div>
    </section>
  );
}
