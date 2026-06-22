import { learningCategories } from "../../data/dashboardData";
import LearningCategoryItem from "./LearningCategoryItem";
import LearningDonutChart from "./LearningDonutChart";
import WeeklyGoalProgress from "./WeeklyGoalProgress";

export default function LearningOverview() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] py-4 px-6 w-full xl:w-3/5">
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
        <LearningDonutChart />

        <div className="space-y-3">
          {learningCategories.map((category) => (
            <LearningCategoryItem key={category.label} category={category} />
          ))}
        </div>
      </div>

      <WeeklyGoalProgress currentHours={18} goalHours={25} />
    </section>
  );
}
