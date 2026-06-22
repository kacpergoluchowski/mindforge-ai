import { popularCourses } from "../../data/coursesData";
import PopularCourseCard from "./PopularCourseCard";

export default function PopularCourses() {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Popular Courses
        </h2>

        <button className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.05]">
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {popularCourses.map((course) => (
          <PopularCourseCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}