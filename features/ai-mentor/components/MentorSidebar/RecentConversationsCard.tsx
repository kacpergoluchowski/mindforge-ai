import { MessageSquare, ChevronRight } from "lucide-react";

import { recentConversations } from "../../data/ai-mentorData";

export default function RecentConversationsCard() {
  return (
    <aside className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Recent Conversations
        </h3>

        <button
          type="button"
          className="text-sm text-violet-400 transition hover:text-violet-300"
        >
          View all
        </button>
      </div>

      <div className="space-y-3">
        {recentConversations.map((conversation) => (
          <button
            key={conversation.id}
            type="button"
            className="
              flex w-full items-center gap-3
              rounded-2xl
              bg-slate-800/40
              p-3
              text-left
              transition-all
              hover:bg-slate-800/70
            "
          >
            <div className="flex size-9 items-center justify-center rounded-xl bg-violet-500/10">
              <MessageSquare className="size-4 text-violet-400" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {conversation.title}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {conversation.time}
              </p>
            </div>

            <ChevronRight className="size-4 text-slate-600" />
          </button>
        ))}
      </div>
    </aside>
  );
}
