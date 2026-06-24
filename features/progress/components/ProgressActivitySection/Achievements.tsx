import clsx from "clsx";

import { achievementsData } from "../../data/progressData";
import type {
  AchievementColor,
  AchievementItem,
} from "../../types/progress.types";

type AchievementCardProps = Omit<AchievementItem, "id">;

const colorStyles: Record<AchievementColor, string> = {
  violet: "bg-violet-500/10 text-violet-400 shadow-violet-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 shadow-emerald-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 shadow-yellow-500/20",
};

function AchievementCard({
  title,
  description,
  date,
  icon: Icon,
  color,
}: AchievementCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div
        className={clsx(
          "mb-8 flex size-16 items-center justify-center rounded-2xl shadow-2xl",
          colorStyles[color]
        )}
      >
        <Icon className="size-8" />
      </div>

      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      <p className="mt-2 text-sm text-slate-500">{date}</p>
    </article>
  );
}

export default function Achievements() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Achievements</h2>

        <button
          type="button"
          className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
        >
          View all
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {achievementsData.map((achievement) => (
          <AchievementCard key={achievement.id} {...achievement} />
        ))}
      </div>
    </section>
  );
}
