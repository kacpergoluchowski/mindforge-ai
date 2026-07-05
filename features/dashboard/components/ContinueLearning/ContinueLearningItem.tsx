import { ChevronRight } from "lucide-react";
import Link from "next/link";

import TranslatedText from "@/components/shared/TranslatedText";
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
      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 sm:size-14 lg:size-16">
        <Icon
          aria-hidden="true"
          className="size-6 text-violet-400 sm:size-7 lg:size-8"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
          {course.title}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          <TranslatedText
            fallback="{progress}% complete"
            translationKey="dashboard.percentComplete"
            values={{ progress }}
          />
        </p>

        <div
          aria-label={`${progress}% complete`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress}
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ChevronRight aria-hidden="true" className="size-5 shrink-0 text-slate-400" />
    </>
  );

  return course.slug ? (
    <Link
      href={`/learn/courses/${course.slug}`}
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 transition hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 sm:gap-4 sm:p-4"
    >
      {content}
    </Link>
  ) : (
    <article className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 sm:gap-4 sm:p-4">
      {content}
    </article>
  );
}
