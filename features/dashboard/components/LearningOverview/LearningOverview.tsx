import LearningCategoryItem from "./LearningCategoryItem";
import LearningDonutChart from "./LearningDonutChart";
import WeeklyGoalProgress from "./WeeklyGoalProgress";
import TranslatedText from "@/components/shared/TranslatedText";
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
    <section className="h-full w-full rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">
          <TranslatedText
            translationKey="dashboard.learningOverview"
            fallback="Learning Overview"
          />
        </h2>

        <span
          className="shrink-0 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-300"
        >
          <TranslatedText translationKey="dashboard.thisWeek" fallback="This Week" />
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[220px_1fr] lg:items-center 2xl:grid-cols-[260px_1fr]">
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
              <TranslatedText
                translationKey="dashboard.startCourseForOverview"
                fallback="Start a course to see learning overview."
              />
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
  return (summary?.categoryBreakdown ?? [])
    .slice(0, categoryColors.length)
    .map((category, index) => {
      const percentage = Math.min(Math.max(category.value, 0), 100);

      return {
        label: category.label,
        time: String(percentage),
        percentage,
        color: categoryColors[index % categoryColors.length],
      };
    });
}
