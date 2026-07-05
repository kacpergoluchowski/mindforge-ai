import Link from "next/link";

import TranslatedText from "@/components/shared/TranslatedText";
import { getRecommendedCourses } from "@/features/courses/api/getCourses";
import type { CourseListItem } from "@/features/courses/types/courses.types";

import type { RecommendedCourse } from "../../types/dashboard.types";
import RecommendedCourseCard from "./RecommendedCourseCard";

export default async function RecommendedCourses() {
  const courses = await getRecommendedCourses();
  const visibleCourses: RecommendedCourse[] = courses.map(mapRecommendedCourse);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 lg:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">
          <TranslatedText
            fallback="Recommended For You"
            translationKey="dashboard.recommendedForYou"
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
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3">
          {visibleCourses.map((course) => (
            <RecommendedCourseCard key={course.id ?? course.title} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">
          <TranslatedText
            fallback="No recommended courses yet."
            translationKey="dashboard.noRecommendedCourses"
          />
        </div>
      )}
    </section>
  );
}

function mapRecommendedCourse(course: CourseListItem): RecommendedCourse {
  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    category: course.category,
    duration: course.duration,
    level: course.level,
    rating: course.rating,
    image: "",
  };
}
