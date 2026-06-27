import { Paperclip, SendHorizonal } from "lucide-react";

export default function ChatComposer() {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-[#141c31] p-3">
      <textarea
        rows={1}
        aria-label="Message to AI Mentor"
        placeholder="Ask anything about programming, career or learning..."
        className="min-h-10 w-full resize-none bg-transparent text-sm leading-6 text-white outline-none placeholder:text-slate-500"
      />

      <div className="mt-2 flex items-center justify-between gap-3">
        <button
          type="button"
          title="Add attachment"
          aria-label="Add attachment"
          className="flex size-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/[0.04] hover:text-white sm:size-10"
        >
          <Paperclip className="size-4 sm:size-5" />
        </button>

        <button
          type="button"
          title="Send message"
          aria-label="Send message"
          className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-950/30 transition hover:bg-violet-500 sm:size-11"
        >
          <SendHorizonal className="size-4 sm:size-5" />
        </button>
      </div>
    </div>
  );
}
