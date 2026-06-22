import { Star } from "lucide-react";
import { RecommendedCourse } from "../../types/dashboard.types";

type RecommendedCourseCardProps = {
  course: RecommendedCourse;
};

export default function RecommendedCourseCard({
  course,
}: RecommendedCourseCardProps) {
  return (
    <article className="relative min-h-36 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <span className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white">
        {course.category}
      </span>

      <div className="mt-8">
        <h3 className="max-w-40 text-sm font-semibold leading-snug text-white">
          {course.title}
        </h3>

        <p className="mt-2 text-xs text-slate-400">
          {course.duration} · {course.level}
        </p>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-yellow-400">
        <Star className="size-3 fill-current" />
        <span>{course.rating}</span>
      </div>
    </article>
  );
}