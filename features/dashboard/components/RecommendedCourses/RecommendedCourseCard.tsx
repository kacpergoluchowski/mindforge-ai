import Link from "next/link";
import { Star } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import type { RecommendedCourse } from "../../types/dashboard.types";

type RecommendedCourseCardProps = {
  course: RecommendedCourse;
};

export default function RecommendedCourseCard({
  course,
}: RecommendedCourseCardProps) {
  const content = (
    <>
      <span className="inline-flex max-w-full rounded-lg bg-white/10 px-2 py-1 text-xs text-white">
        {course.category}
      </span>

      <div className="mt-5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
          {course.title}
        </h3>

        <p className="mt-2 text-xs text-slate-400">
          {course.duration} / <CourseLevelLabel level={course.level} />
        </p>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-yellow-400">
        <Star aria-hidden="true" className="size-3 fill-current" />
        <span>{course.rating}</span>
      </div>
    </>
  );

  return course.slug ? (
    <Link
      href={`/learn/courses/${course.slug}`}
      className="relative block min-h-[9rem] rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70"
    >
      {content}
    </Link>
  ) : (
    <article className="relative min-h-[9rem] rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      {content}
    </article>
  );
}

function CourseLevelLabel({ level }: { level: string }) {
  const levelKey = level.toLowerCase();
  const translationKeys: Record<string, string> = {
    advanced: "common.advanced",
    beginner: "common.beginner",
    intermediate: "common.intermediate",
  };

  return (
    <TranslatedText
      fallback={level}
      translationKey={translationKeys[levelKey] ?? "courses.level"}
    />
  );
}
