import { ChevronLeft, ChevronRight } from "lucide-react";
import { recommendedCourses } from "../../data/dashboardData";
import RecommendedCourseCard from "./RecommendedCourseCard";

export default function RecommendedCourses() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 xl:w-3/5 h-min sm:h-70">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Recommended For You
        </h2>

        <div className="flex gap-2">
          <button className="rounded-xl border border-white/10 p-2 text-slate-300">
            <ChevronLeft className="size-4" />
          </button>

          <button className="rounded-xl border border-white/10 p-2 text-slate-300">
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {recommendedCourses.map((course) => (
          <RecommendedCourseCard key={course.title} course={course} />
        ))}
      </div>
    </section>
  );
}
