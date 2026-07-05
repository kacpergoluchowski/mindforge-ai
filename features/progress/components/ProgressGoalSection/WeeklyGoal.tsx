import { Target } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";

type WeeklyGoalProps = {
  completedLessons: number;
  target: number;
};

export default function WeeklyGoal({ completedLessons, target }: WeeklyGoalProps) {
  const progress = target > 0 ? Math.min((completedLessons / target) * 100, 100) : 0;
  const remaining = Math.max(target - completedLessons, 0);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5 lg:p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText fallback="Weekly Goal" translationKey="progress.weeklyGoal" />
        </h2>

        <div className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <Target aria-hidden="true" className="size-5" />
        </div>
      </div>

      <div className="flex items-end gap-2">
        <span className="text-5xl font-bold text-white">
          {completedLessons}
        </span>

        <span className="mb-2 text-slate-400">
          /{" "}
          <TranslatedText
            fallback="{count} lessons"
            translationKey="progress.lessonsCount"
            values={{ count: target }}
          />
        </span>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-slate-400">
            <TranslatedText fallback="Progress" translationKey="learningPaths.progress" />
          </span>
          <span className="font-medium text-violet-400">
            {Math.round(progress)}%
          </span>
        </div>

        <div
          aria-label={`${Math.round(progress)}%`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={Math.round(progress)}
          className="h-3 overflow-hidden rounded-full bg-slate-800"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/[0.03] p-4">
          <p className="text-sm text-slate-400">
            <TranslatedText fallback="Remaining" translationKey="progress.remaining" />
          </p>
          <p className="mt-1 font-semibold text-white">
            <TranslatedText
              fallback="{count} lessons"
              translationKey="progress.lessonsCount"
              values={{ count: remaining }}
            />
          </p>
        </div>

        <div className="rounded-2xl bg-white/[0.03] p-4">
          <p className="text-sm text-slate-400">
            <TranslatedText fallback="Deadline" translationKey="progress.deadline" />
          </p>
          <p className="mt-1 font-semibold text-white">
            <TranslatedText fallback="This week" translationKey="dashboard.thisWeek" />
          </p>
        </div>
      </div>
    </section>
  );
}
