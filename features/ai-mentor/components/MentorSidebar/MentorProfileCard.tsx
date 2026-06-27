import { Bot, ShieldCheck } from "lucide-react";

export default function MentorProfileCard() {
  return (
    <aside className="shrink-0 rounded-2xl border border-white/10 bg-[#111a2d]/80 p-3 text-center">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/15 text-violet-200 shadow-2xl shadow-violet-950/30">
        <Bot className="size-7" />
      </div>

      <h3 className="mt-3 text-base font-semibold text-white">
        Your AI Mentor
      </h3>

      <p className="mx-auto mt-1 max-w-56 text-xs leading-5 text-slate-400">
        Always here to help you learn, solve problems and achieve your goals.
      </p>

      <div className="mt-3 border-t border-white/10 pt-3">
        <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-violet-300">
          <ShieldCheck className="size-3.5" />
          API ready layout
        </div>
      </div>
    </aside>
  );
}
