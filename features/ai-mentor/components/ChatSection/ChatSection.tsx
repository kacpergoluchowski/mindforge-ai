import { History, Sparkles } from "lucide-react";

import ChatComposer from "./ChatComposer";
import MentorMessage from "./MentorMessage";

export default function ChatSection() {
  return (
    <section className="flex h-full min-w-0 flex-col overflow-hidden">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 p-3 sm:p-4">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
            <Sparkles className="size-5" />
          </div>

          <div className="min-w-0">
            <h1 className="break-words text-xl font-semibold text-white">
              AI Mentor
            </h1>
            <p className="mt-1 hidden text-sm text-slate-400 sm:block">
              Your personal learning companion
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white sm:px-4"
        >
          <History className="size-4" />
          History
        </button>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-5">
        <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-center gap-4">
          <MentorMessage variant="welcome" />

          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl bg-violet-600 px-4 py-3 text-sm leading-6 text-white shadow-lg shadow-violet-950/30 sm:max-w-xl sm:px-5">
              <p>Can you explain the CSS Grid layout in a simple way?</p>
              <p className="mt-2 text-right text-xs text-violet-100/80">
                10:31
              </p>
            </div>
          </div>

          <MentorMessage />
        </div>
      </div>

      <div className="shrink-0 border-t border-white/10 p-3 sm:p-4">
        <div className="mx-auto max-w-5xl">
          <ChatComposer />
          <p className="mt-3 text-center text-xs text-slate-500">
            AI can make mistakes. Always verify important information.
          </p>
        </div>
      </div>
    </section>
  );
}
