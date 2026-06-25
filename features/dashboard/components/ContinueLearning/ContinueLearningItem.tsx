import { ChevronRight } from "lucide-react";
import Link from "next/link";

import type { ContinueLearningCourse } from "../../types/dashboard.types";

type ContinueLearningItemProps = {
  course: ContinueLearningCourse;
};

export default function ContinueLearningItem({
  course,
}: ContinueLearningItemProps) {
  const Icon = course.icon;
  const progress = Math.min(Math.max(course.progress, 0), 100);
  const content = (
    <>
      <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15">
        <Icon className="size-8 text-violet-400" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-white">
          {course.title}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          {progress}% complete
        </p>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ChevronRight className="size-5 shrink-0 text-slate-400" />
    </>
  );

  return course.slug ? (
    <Link
      href={`/learn/courses/${course.slug}`}
      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20"
    >
      {content}
    </Link>
  ) : (
    <article className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      {content}
    </article>
  );
}
