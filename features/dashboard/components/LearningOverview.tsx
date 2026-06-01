import { learningCategories } from "../data/dashboardData";
import LearningCategoryItem from "./LearningCategoryItem";
import WeeklyGoalProgress from "./WeeklyGoalProgress";

const chartSegments = [
  { color: "#8b5cf6", value: 49 },
  { color: "#34d399", value: 23 },
  { color: "#f59e0b", value: 18 },
  { color: "#3b82f6", value: 10 },
];

const radius = 56;
const circumference = 2 * Math.PI * radius;
const gap = 3;

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
        <div className="flex items-center justify-center">
          <div className="relative size-52">
            <svg viewBox="0 0 160 160" className="size-full -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="12"
              />

              {chartSegments.map((segment, index) => {
                const previousValue = chartSegments
                  .slice(0, index)
                  .reduce((sum, item) => sum + item.value, 0);

                const segmentLength = (segment.value / 100) * circumference;
                const offset = -(previousValue / 100) * circumference;

                return (
                  <circle
                    key={segment.color}
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke={segment.color}
                    strokeWidth="18"
                    strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
                    strokeDashoffset={offset}
                  />
                );
              })}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-white">18h 45m</span>

              <span className="text-xs text-slate-400">This week </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {learningCategories.map((category) => (
            <LearningCategoryItem key={category.label} category={category} />
          ))}
        </div>
      </div>

      <WeeklyGoalProgress />
    </section>
  );
}
