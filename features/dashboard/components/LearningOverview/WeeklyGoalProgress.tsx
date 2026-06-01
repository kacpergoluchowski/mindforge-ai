export default function WeeklyGoalProgress() {
  const currentHours = 18;
  const goalHours = 25;

  const progress = (currentHours / goalHours) * 100;

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">
            Weekly Goal
          </h3>

          <p className="text-sm text-slate-400">
            {currentHours} / {goalHours} hours completed
          </p>
        </div>

        <span className="text-sm font-semibold text-violet-400">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-violet-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}