import { ChevronRight, MessageSquareText } from "lucide-react";

const suggestions = [
  {
    title: "What is semantic HTML?",
    tag: "HTML",
  },
  {
    title: "How to center a div?",
    tag: "CSS",
  },
];

export default function RecentConversationsCard() {
  return (
    <aside className="min-h-0 flex-1 rounded-2xl border border-white/10 bg-[#111a2d]/80 p-3">
      <h3 className="text-sm font-semibold text-white">Suggestions for you</h3>

      <div className="mt-3 space-y-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.title}
            type="button"
            className="flex w-full min-w-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-2 text-left transition hover:border-violet-400/30 hover:bg-violet-500/10"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
              <MessageSquareText className="size-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-slate-200">
                {suggestion.title}
              </p>
              <span className="mt-1 inline-flex rounded-full bg-violet-500/10 px-2 py-0.5 text-xs text-violet-300">
                {suggestion.tag}
              </span>
            </div>

            <ChevronRight className="size-4 shrink-0 text-slate-500" />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-violet-300 transition hover:border-violet-400/30 hover:bg-violet-500/10"
      >
        See more
      </button>
    </aside>
  );
}
