import { Target } from "lucide-react";

export default function CurrentContextCard() {
  return (
    <aside className="shrink-0 rounded-2xl border border-white/10 bg-[#111a2d]/80 p-3">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
          <Target className="size-4" />
        </div>

        <h3 className="text-sm font-semibold text-white">Today&apos;s focus</h3>
      </div>

      <p className="mt-3 text-sm text-slate-300">HTML & CSS Foundations</p>

      <div className="mt-2 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-[60%] rounded-full bg-violet-500" />
        </div>

        <span className="text-sm text-slate-400">60%</span>
      </div>
    </aside>
  );
}
