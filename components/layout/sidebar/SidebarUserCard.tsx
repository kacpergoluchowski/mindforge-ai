export default function SidebarUserCard() {
  return (
    <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full bg-violet-500 text-sm font-semibold text-white">
          K
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            Kacper
          </p>

          <p className="text-xs text-slate-400">
            Premium Plan
          </p>
        </div>
      </div>
    </div>
  );
}