import { CheckCircle2 } from "lucide-react";

import { achievements } from "../data/profileData";

export default function AchievementsCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/40 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Achievements
        </h2>

        <button
          type="button"
          className="text-sm text-violet-400 transition hover:text-violet-300"
        >
          View all
        </button>
      </div>

      <div className="space-y-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;

          return (
            <div
              key={achievement.id}
              className="
                flex items-center gap-4
                rounded-2xl
                border border-white/5
                bg-slate-950/30
                p-4
                transition
                hover:border-white/10
              "
            >
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                <Icon className="size-6 text-violet-400" />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-white">
                  {achievement.title}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {achievement.description}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {achievement.date}
                </p>
              </div>

              <CheckCircle2 className="size-5 text-emerald-500" />
            </div>
          );
        })}
      </div>
    </section>
  );
}