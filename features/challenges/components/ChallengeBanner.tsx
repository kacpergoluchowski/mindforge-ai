import { Play, Trophy } from "lucide-react";

export default function ChallengeBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-[#111326] px-6 py-8 lg:px-10">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 via-violet-500/5 to-transparent" />

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_400px]">
        <div>
          <div className="mb-4 flex items-center gap-2 text-violet-400">
            <Trophy className="size-5" />
            <span className="text-sm font-medium">
              Push Your Limits
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white lg:text-5xl">
            Solve. Learn. Grow.
          </h2>

          <p className="mt-4 max-w-xl text-slate-400">
            Join thousands of developers improving their skills through
            real coding challenges.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-violet-500 px-6 py-3 font-medium text-white transition hover:bg-violet-600">
              Browse Challenges
            </button>

            <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-3 text-slate-300 transition hover:bg-white/[0.05]">
              <Play className="size-4" />
              How It Works
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="flex size-56 items-center justify-center rounded-full bg-violet-500/10 ring-1 ring-violet-500/20">
            <Trophy className="size-28 text-violet-400" />
          </div>
        </div>
      </div>
    </section>
  );
}