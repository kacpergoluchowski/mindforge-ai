import { Target } from "lucide-react";
import { weeklyGoalData } from "../../data/progressData";

export default function WeeklyGoal() {
  const progress =
    weeklyGoalData.target > 0
      ? Math.min(
          Math.max(
            (weeklyGoalData.current / weeklyGoalData.target) * 100,
            0
          ),
          100
        )
      : 0;

  return (
    <section className="rounded-3xl border border-white/10 bg-[#111a2d]/80 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Weekly Goal</h2>

        <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <Target className="size-5" />
        </div>
      </div>

      <div className="flex items-end gap-2">
        <span className="text-5xl font-bold text-white">
          {weeklyGoalData.current}
        </span>

        <span className="mb-2 text-slate-400">
          / {weeklyGoalData.target} hours
        </span>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">Progress</span>
          <span className="font-medium text-violet-400">
            {Math.round(progress)}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/[0.03] p-4">
          <p className="text-sm text-slate-400">Remaining</p>
          <p className="mt-1 font-semibold text-white">
            {weeklyGoalData.remaining}
          </p>
        </div>

        <div className="rounded-2xl bg-white/[0.03] p-4">
          <p className="text-sm text-slate-400">Deadline</p>
          <p className="mt-1 font-semibold text-white">
            {weeklyGoalData.daysLeft}
          </p>
        </div>
      </div>
    </section>
  );
}
