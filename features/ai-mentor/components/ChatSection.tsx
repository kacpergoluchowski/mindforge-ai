import {
  Bot,
  Copy,
  Plus,
  SendHorizonal,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

export default function ChatSection() {
  return (
    <section className="mt-6">
      <div className="rounded-3xl border border-white/10 bg-slate-900/40">
        <div className="min-h-[580px] p-6">
          <div className="mb-8 flex justify-end">
            <div className="max-w-xl rounded-2xl bg-violet-600 px-5 py-4 text-white">
              Can you explain the difference between var, let and const in
              JavaScript?
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-violet-500/20">
              <Bot className="size-6 text-violet-300" />
            </div>

            <div className="flex-1">
              <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                <p className="leading-7 text-slate-200">
                  Great question! The main differences between var, let and
                  const come down to scope, hoisting and mutability.
                </p>

                <div className="mt-4 rounded-xl bg-slate-950 p-4">
                  <pre className="overflow-auto text-sm text-slate-300">
                    <code>
                      {`var x = 10;
let y = 20;
const z = 30;`}
                    </code>
                  </pre>
                </div>

                <p className="mt-4 text-slate-300">
                  Let me know if you want more examples or a deeper dive.
                </p>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button className="text-slate-500 transition hover:text-white">
                  <ThumbsUp className="size-4" />
                </button>

                <button className="text-slate-500 transition hover:text-white">
                  <ThumbsDown className="size-4" />
                </button>

                <button className="text-slate-500 transition hover:text-white">
                  <Copy className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-3">
            <button className="flex size-10 items-center justify-center rounded-xl bg-slate-900 text-slate-300">
              <Plus className="size-5" />
            </button>

            <input
              type="text"
              placeholder="Ask anything about programming..."
              className="flex-1 bg-transparent outline-none placeholder:text-slate-500"
            />

            <button className="flex size-11 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500">
              <SendHorizonal className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}