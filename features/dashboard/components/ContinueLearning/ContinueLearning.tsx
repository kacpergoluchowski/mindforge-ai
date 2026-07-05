import { Atom, FileCode2, Hexagon } from "lucide-react";
import Link from "next/link";

import TranslatedText from "@/components/shared/TranslatedText";
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
    <section className="flex h-full min-h-[260px] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 lg:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">
          <TranslatedText
            translationKey="dashboard.continueLearning"
            fallback="Continue Learning"
          />
        </h2>

        <Link
          href="/learn/courses"
          className="shrink-0 text-sm text-slate-400 transition hover:text-white"
        >
          <TranslatedText translationKey="common.viewAll" fallback="View all" />
        </Link>
      </div>

      {visibleCourses.length ? (
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 sm:space-y-4">
          {visibleCourses.map((course) => (
            <ContinueLearningItem key={course.id ?? course.title} course={course} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
          <p>
            <TranslatedText
              translationKey="dashboard.noCoursesInProgress"
              fallback="No courses in progress."
            />
          </p>
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
