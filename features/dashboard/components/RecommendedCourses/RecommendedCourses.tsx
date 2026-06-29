import { ChevronLeft, ChevronRight } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import { getRecommendedCourses } from "@/features/courses/api/getCourses";
import type { CourseListItem } from "@/features/courses/types/courses.types";

import type { RecommendedCourse } from "../../types/dashboard.types";
import RecommendedCourseCard from "./RecommendedCourseCard";

export default async function RecommendedCourses() {
  const courses = await getRecommendedCourses();
  const visibleCourses: RecommendedCourse[] = courses.map(mapRecommendedCourse);

  return (
    <section className="h-min rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:h-70">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          <TranslatedText
            fallback="Recommended For You"
            translationKey="dashboard.recommendedForYou"
          />
        </h2>

        <div className="flex gap-2">
          <button
            type="button"
            title="Poprzednie kursy"
            aria-label="Poprzednie kursy"
            className="rounded-xl border border-white/10 p-2 text-slate-300"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            type="button"
            title="Następne kursy"
            aria-label="Następne kursy"
            className="rounded-xl border border-white/10 p-2 text-slate-300"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {visibleCourses.length ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {visibleCourses.map((course) => (
            <RecommendedCourseCard key={course.id ?? course.title} course={course} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-400">
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
