import { continueLearningCourses } from "../../data/dashboardData";
import ContinueLearningItem from "./ContinueLearningItem";

export default function ContinueLearning() {
  return (
    <section className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Continue Learning</h2>

        <button
          type="button"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          View all
        </button>
      </div>

      <div className="space-y-4">
        {continueLearningCourses.map((course) => (
          <ContinueLearningItem key={course.title} course={course} />
        ))}
      </div>
    </section>
  );
}
