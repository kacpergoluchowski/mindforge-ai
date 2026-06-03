import { Sparkles } from "lucide-react";

export default function AICourseBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-violet-500/30 bg-[#111326] px-6 py-7 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/25 via-violet-500/10 to-transparent" />
      <div className="absolute right-20 top-1/2 hidden h-56 w-56 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl lg:block" />

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <span className="inline-flex rounded-lg border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-xs font-medium uppercase text-violet-300">
            New
          </span>

          <h2 className="mt-4 text-2xl font-bold text-white lg:text-3xl">
            AI-Powered Learning
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400 lg:text-base">
            Get personalized course recommendations based on your learning goals
            and progress.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600">
            Discover with AI
            <Sparkles className="size-4" />
          </button>
        </div>

        <div className="relative hidden h-48 lg:block">
          <div className="absolute right-8 top-8 h-24 w-48 -rotate-12 rounded-2xl border border-violet-400/40 bg-violet-500/20 shadow-2xl shadow-violet-500/30" />
          <div className="absolute right-20 top-16 h-24 w-48 -rotate-12 rounded-2xl border border-violet-400/40 bg-violet-500/30 shadow-2xl shadow-violet-500/30" />
          <div className="absolute right-12 top-20 h-24 w-48 -rotate-12 rounded-2xl border border-violet-400/40 bg-violet-600/40 shadow-2xl shadow-violet-500/40" />

          <div className="absolute right-24 top-0 h-16 w-44 -rotate-12 rounded-xl border border-violet-300/50 bg-violet-500/40" />

          <div className="absolute right-36 top-7 h-3 w-10 -rotate-12 rounded-full bg-violet-300" />
          <div className="absolute right-10 bottom-3 h-2 w-2 rounded-full bg-white shadow-[0_0_20px_6px_rgba(255,255,255,0.6)]" />
        </div>
      </div>
    </section>
  );
}