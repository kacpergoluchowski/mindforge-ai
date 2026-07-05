import LearningInsights from "./LearningInsights";
import WeeklyGoal from "./WeeklyGoal";
import type { ProgressSummary } from "../../types/progress.types";

type ProgressGoalSectionProps = {
  summary: ProgressSummary | null;
};

export default function ProgressGoalSection({ summary }: ProgressGoalSectionProps) {
  return (
    <aside className="min-w-0 space-y-5 2xl:sticky 2xl:top-24 2xl:self-start">
      <WeeklyGoal
        completedLessons={summary?.thisWeekLessons ?? 0}
        target={summary?.weeklyLessonGoal ?? 5}
      />
      <LearningInsights insights={summary?.insights ?? []} />
    </aside>
  );
}
