import { ChevronRight } from "lucide-react";

import type { LucideIcon } from "lucide-react";

type ContinueLearningItemProps = {
  course: {
    title: string;
    progress: number;
    icon: LucideIcon;
  };
};

export default function ContinueLearningItem({
  course,
}: ContinueLearningItemProps) {
  const Icon = course.icon;

  return (
    <article className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15">
        <Icon className="size-8 text-violet-400" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-white">
          {course.title}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          {course.progress}% complete
        </p>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${course.progress}%` }}
          />
        </div>
      </div>

      <ChevronRight className="size-5 shrink-0 text-slate-400" />
    </article>
  );
}