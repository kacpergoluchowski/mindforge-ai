import LearningInsights from "./LearningInsights";
import WeeklyGoal from "./WeeklyGoal";
import type { ProgressSummary } from "../../types/progress.types";

type ProgressGoalSectionProps = {
  summary: ProgressSummary | null;
};

export default function ProgressGoalSection({ summary }: ProgressGoalSectionProps) {
  return (
    <section className="grid gap-5 pb-28 xl:grid-cols-[0.9fr_1.4fr] xl:pb-8">
      <WeeklyGoal
        completedLessons={summary?.thisWeekLessons ?? 0}
        target={summary?.weeklyLessonGoal ?? 5}
      />
      <LearningInsights insights={summary?.insights ?? []} />
    </section>
  );
}
