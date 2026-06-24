import { Bot, Copy, ThumbsDown, ThumbsUp } from "lucide-react";

const messageActions = [
  { label: "Helpful response", icon: ThumbsUp },
  { label: "Unhelpful response", icon: ThumbsDown },
  { label: "Copy response", icon: Copy },
];

export default function MentorMessage() {
  return (
    <div className="flex gap-4">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-violet-500/20">
        <Bot className="size-6 text-violet-300" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
          <p className="leading-7 text-slate-200">
            Great question! The main differences between var, let and const
            come down to scope, hoisting and mutability.
          </p>

          <div className="mt-4 rounded-xl bg-slate-950 p-4">
            <pre className="overflow-auto text-sm text-slate-300">
              <code>{`var x = 10;
let y = 20;
const z = 30;`}</code>
            </pre>
          </div>

          <p className="mt-4 text-slate-300">
            Let me know if you want more examples or a deeper dive.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          {messageActions.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              title={label}
              aria-label={label}
              className="text-slate-500 transition hover:text-white"
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
