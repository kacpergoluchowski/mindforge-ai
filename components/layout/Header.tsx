import { Bell, Command, Search, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 hidden h-20 items-center justify-between border-b border-white/10 px-8 backdrop-blur-xl lg:flex">
      <div className="relative w-full max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />

        <input
          type="text"
          placeholder="Search anything..."
          className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-12 pr-16 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500/50 focus:bg-white/[0.06]"
        />

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-slate-500">
          <Command className="size-3" />
          <span>K</span>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-slate-300 transition hover:text-white">
          <Sparkles className="size-5" />
        </button>

        <button className="relative text-slate-300 transition hover:text-white">
          <Bell className="size-5" />

          <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-violet-500 text-xs font-semibold text-white">
            3
          </span>
        </button>
      </div>
    </header>
  );
}