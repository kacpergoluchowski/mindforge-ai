import { continueLearningCourses } from "../../data/dashboardData";
import ContinueLearningItem from "./ContinueLearningItem";

export default function ContinueLearning() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 w-full semiXl:w-2/5 mt-5 semiXl:mt-0">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Continue Learning
        </h2>

        <button className="text-sm text-slate-400 transition hover:text-white">
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