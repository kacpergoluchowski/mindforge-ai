import TranslatedText from "@/components/shared/TranslatedText";

type WeeklyGoalProgressProps = {
  currentLessons: number;
  goalLessons: number;
};

export default function WeeklyGoalProgress({
  currentLessons,
  goalLessons,
}: WeeklyGoalProgressProps) {
  const progress =
    goalLessons > 0
      ? Math.min(Math.max((currentLessons / goalLessons) * 100, 0), 100)
      : 0;

  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-6 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white">
            <TranslatedText
              translationKey="dashboard.weeklyGoal"
              fallback="Weekly Goal"
            />
          </h3>

          <p className="text-sm text-slate-400">
            <TranslatedText
              translationKey="dashboard.lessonsCompleted"
              fallback="{current} / {goal} lessons completed"
              values={{ current: currentLessons, goal: goalLessons }}
            />
          </p>
        </div>

        <span className="text-sm font-semibold text-violet-400">
          {Math.round(progress)}%
        </span>
      </div>

      <div
        aria-label={`${Math.round(progress)}% weekly goal completed`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(progress)}
        className="h-3 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-violet-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
