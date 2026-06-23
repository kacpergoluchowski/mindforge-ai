import clsx from "clsx";
import { Check, Flame } from "lucide-react";

import { challengeStreak } from "../../data/challengesData";

type StreakDay = (typeof challengeStreak.days)[number];

export default function ChallengeStreak() {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5">
      <h2 className="mb-5 text-xl font-semibold text-white">
        Challenge Streak
      </h2>

      <StreakSummary currentStreak={challengeStreak.currentStreak} />

      <div className="mt-8 grid grid-cols-7 gap-2">
        {challengeStreak.days.map((day) => (
          <StreakDayItem key={day.day} day={day} />
        ))}
      </div>
    </section>
  );
}

type StreakSummaryProps = {
  currentStreak: number;
};

function StreakSummary({ currentStreak }: StreakSummaryProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-500/10">
        <Flame className="size-8 text-orange-400" />
      </div>

      <div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-white">
            {currentStreak}
          </span>

          <span className="mb-1 text-slate-400">days</span>
        </div>

        <p className="text-sm text-slate-400">Keep solving every day!</p>
      </div>
    </div>
  );
}

type StreakDayItemProps = {
  day: StreakDay;
};

function StreakDayItem({ day }: StreakDayItemProps) {
  return (
    <div className="text-center">
      <p className="mb-2 text-xs text-slate-500">{day.day}</p>

      <div
        className={clsx(
          "mx-auto flex size-8 items-center justify-center rounded-full",
          day.completed
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-slate-800 text-slate-500"
        )}
      >
        {day.completed ? <Check className="size-4" /> : <span>-</span>}
      </div>
    </div>
  );
}
