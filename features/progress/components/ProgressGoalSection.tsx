import LearningInsights from "./LearningInsights";
import WeeklyGoal from "./WeeklyGoal";

export default function ProgressGoalSection() {
  return (
    <section className="grid gap-5 pb-28 xl:grid-cols-[0.9fr_1.4fr] xl:pb-8">
      <WeeklyGoal />
      <LearningInsights />
    </section>
  );
}