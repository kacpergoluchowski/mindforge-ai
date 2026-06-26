import LearningCategoryItem from "./LearningCategoryItem";
import LearningDonutChart from "./LearningDonutChart";
import WeeklyGoalProgress from "./WeeklyGoalProgress";
import type { LearningCategory } from "../../types/dashboard.types";
import type { ProgressSummary } from "@/features/progress/types/progress.types";

type LearningOverviewProps = {
  summary: ProgressSummary | null;
};

const categoryColors: LearningCategory["color"][] = [
  "violet",
  "emerald",
  "orange",
  "blue",
];

export default function LearningOverview({ summary }: LearningOverviewProps) {
  const categories = mapLearningCategories(summary);

  return (
    <section className="h-full w-full rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Learning Overview</h2>

        <button
          type="button"
          className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300"
        >
          This Week
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <LearningDonutChart
          categories={categories}
          totalLabel={`${summary?.thisWeekXp ?? 0} XP`}
        />

        <div className="space-y-3">
          {categories.length ? (
            categories.map((category) => (
              <LearningCategoryItem key={category.label} category={category} />
            ))
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
              Start a course to see learning overview.
            </div>
          )}
        </div>
      </div>

      <WeeklyGoalProgress
        currentLessons={summary?.thisWeekLessons ?? 0}
        goalLessons={summary?.weeklyLessonGoal ?? 5}
      />
    </section>
  );
}

function mapLearningCategories(
  summary: ProgressSummary | null
): LearningCategory[] {
  return (summary?.categoryBreakdown ?? []).map((category, index) => ({
    label: category.label,
    time: `${category.value}% focus`,
    percentage: category.value,
    color: categoryColors[index % categoryColors.length],
  }));
}
