import clsx from "clsx";
import { BarChart3, Clock3 } from "lucide-react";
import Link from "next/link";

import TranslatedText from "@/components/shared/TranslatedText";
import type { ContinueLearningCardProps } from "../../types/courses.types";

type ContinueLearningColor = ContinueLearningCardProps["color"];

type ContinueLearningColorStyle = {
  glow: string;
  icon: string;
  progress: string;
};

const colorStyles: Record<ContinueLearningColor, ContinueLearningColorStyle> = {
  blue: {
    icon: "text-sky-400",
    glow: "bg-sky-500/10",
    progress: "bg-violet-500",
  },
  green: {
    icon: "text-emerald-400",
    glow: "bg-emerald-500/10",
    progress: "bg-violet-500",
  },
  violet: {
    icon: "text-violet-400",
    glow: "bg-violet-500/10",
    progress: "bg-violet-500",
  },
};

export default function ContinueLearningCard({
  title,
  instructor,
  progress,
  duration,
  level,
  status,
  icon,
  color,
  slug,
}: ContinueLearningCardProps) {
  const styles = colorStyles[color];
  const normalizedProgress = Math.min(progress, 100);
  const content = (
    <>
      <CourseVisual icon={icon} status={status} styles={styles} />

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 min-h-10 text-base font-semibold leading-5 text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-400">{instructor}</p>

        <CourseProgress progress={normalizedProgress} styles={styles} />

        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs text-slate-400">
          <CourseMeta icon={Clock3} value={duration} />
          <CourseMeta icon={BarChart3} value={level} />
        </div>
      </div>
    </>
  );

  return slug ? (
    <Link
      href={`/learn/courses/${slug}`}
      className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]/80 shadow-[0_18px_70px_rgba(0,0,0,0.14)] transition hover:border-white/20 hover:bg-[#131f35]"
    >
      {content}
    </Link>
  ) : (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]/80 shadow-[0_18px_70px_rgba(0,0,0,0.14)] transition hover:border-white/20 hover:bg-[#131f35]">
      {content}
    </article>
  );
}

type CourseVisualProps = {
  icon: ContinueLearningCardProps["icon"];
  status: string;
  styles: ContinueLearningColorStyle;
};

function CourseVisual({ icon: Icon, status, styles }: CourseVisualProps) {
  return (
    <div className={clsx("relative flex h-32 items-center justify-center", styles.glow)}>
      <span className="absolute right-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
        {status || (
          <TranslatedText
            fallback="In progress"
            translationKey="common.inProgress"
          />
        )}
      </span>

      <Icon className={clsx("size-16", styles.icon)} />
    </div>
  );
}

type CourseProgressProps = {
  progress: number;
  styles: ContinueLearningColorStyle;
};

function CourseProgress({ progress, styles }: CourseProgressProps) {
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-800">
        <div
          className={clsx("h-full rounded-full", styles.progress)}
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-sm text-slate-300">{progress}%</span>
    </div>
  );
}

type CourseMetaProps = {
  icon: ContinueLearningCardProps["icon"];
  value: string;
};

function CourseMeta({ icon: Icon, value }: CourseMetaProps) {
  return (
    <div className="flex min-w-0 items-center gap-1.5">
      <Icon className="size-4" />
      <span className="truncate">{value}</span>
    </div>
  );
}
