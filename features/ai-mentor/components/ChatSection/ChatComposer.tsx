import { Plus, SendHorizonal } from "lucide-react";

export default function ChatComposer() {
  return (
    <div className="border-t border-white/10 p-4">
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-3">
        <button
          type="button"
          title="Add attachment"
          aria-label="Add attachment"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-slate-300"
        >
          <Plus className="size-5" />
        </button>

        <input
          type="text"
          aria-label="Message to AI Mentor"
          placeholder="Ask anything about programming..."
          className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-500"
        />

        <button
          type="button"
          title="Send message"
          aria-label="Send message"
          className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500"
        >
          <SendHorizonal className="size-5" />
        </button>
      </div>
    </div>
  );
}
