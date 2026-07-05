import clsx from "clsx";

import TranslatedText from "@/components/shared/TranslatedText";
import type {
  TopicProgressColor,
  TopicProgressItem as TopicProgressItemData,
} from "../../types/progress.types";

type TopicProgressItemProps = Omit<TopicProgressItemData, "id">;

const iconStyles: Record<TopicProgressColor, string> = {
  yellow: "bg-yellow-500 text-slate-950",
  blue: "bg-blue-500 text-white",
  sky: "bg-sky-500 text-white",
  green: "bg-green-500/10 text-green-400",
};

function TopicProgressItem({
  title,
  progress,
  icon: Icon,
  color,
}: TopicProgressItemProps) {
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="flex items-center gap-4">
      <div
        className={clsx(
          "flex size-10 shrink-0 items-center justify-center rounded-xl",
          iconStyles[color]
        )}
      >
        <Icon aria-hidden="true" className="size-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="text-sm text-slate-300">{normalizedProgress}%</p>
        </div>

        <div
          aria-label={`${normalizedProgress}%`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={normalizedProgress}
          className="h-2 overflow-hidden rounded-full bg-slate-800"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${normalizedProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

type TopicProgressProps = {
  topics: TopicProgressItemData[];
};

export default function TopicProgress({ topics }: TopicProgressProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-4 sm:p-5 lg:p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText
            fallback="Topic Progress"
            translationKey="progress.topicsProgress"
          />
        </h2>
      </div>

      <div className="space-y-5">
        {topics.length ? (
          topics.map((topic) => (
            <TopicProgressItem key={topic.id} {...topic} />
          ))
      ) : (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
            <TranslatedText
              fallback="Start a course to see topic progress."
              translationKey="progress.emptyTopicProgress"
            />
        </div>
      )}
      </div>
    </section>
  );
}
