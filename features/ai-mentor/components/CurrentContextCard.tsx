import { ExternalLink, Flame } from "lucide-react";

export default function CurrentContextCard() {
  return (
    <aside className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Current Context</h3>

        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-violet-400 transition hover:text-violet-300"
        >
          <ExternalLink className="size-4" />
          Edit
        </button>
      </div>

      <div>
        <p className="text-sm text-slate-400">Focus</p>

        <p className="mt-2 font-medium text-white">JavaScript Basics</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full w-[65%] rounded-full bg-emerald-500" />
          </div>

          <span className="text-sm text-slate-400">65%</span>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-400">Next Goal</p>

        <p className="mt-2 font-medium text-white">Functions & Scope</p>
      </div>

      <div className="mt-6 border-t border-white/10 pt-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-orange-500/10">
            <Flame className="size-5 text-orange-400" />
          </span>

          <div>
            <p className="text-sm text-slate-400">Learning Streak</p>
            <p className="mt-1 font-semibold text-white">7 days</p>
          </div>
        </div>
      </div>
    </aside>
  );
}