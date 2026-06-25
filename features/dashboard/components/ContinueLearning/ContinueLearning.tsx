import { Atom, FileCode2, Hexagon } from "lucide-react";

import { getContinueLearningCourses } from "@/features/courses/api/getCourses";

import ContinueLearningItem from "./ContinueLearningItem";
import type { ContinueLearningCourse as DashboardCourse } from "../../types/dashboard.types";
import type { ContinueLearningCourse as SupabaseCourse } from "@/features/courses/types/courses.types";

const iconMap = {
  atom: Atom,
  "file-code": FileCode2,
  hexagon: Hexagon,
};

export default async function ContinueLearning() {
  const courses = await getContinueLearningCourses();
  const visibleCourses: DashboardCourse[] = courses.map(mapDashboardCourse);

  return (
    <section className="flex h-full w-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Continue Learning</h2>

        <button
          type="button"
          className="text-sm text-slate-400 transition hover:text-white"
        >
          View all
        </button>
      </div>

      {visibleCourses.length ? (
        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {visibleCourses.map((course) => (
            <ContinueLearningItem key={course.id ?? course.title} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          No courses in progress.
        </div>
      )}
    </section>
  );
}

function mapDashboardCourse(course: SupabaseCourse): DashboardCourse {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    progress: course.progress,
    icon: iconMap[course.icon as keyof typeof iconMap] ?? FileCode2,
  };
}
