import clsx from "clsx";
import { BarChart3, Clock3 } from "lucide-react";

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
}: ContinueLearningCardProps) {
  const styles = colorStyles[color];
  const normalizedProgress = Math.min(progress, 100);

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#111a2d]/80 transition hover:border-white/20 hover:bg-[#131f35]">
      <CourseVisual icon={icon} status={status} styles={styles} />

      <div className="p-4">
        <h3 className="line-clamp-2 min-h-10 text-base font-semibold leading-5 text-white">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-400">{instructor}</p>

        <CourseProgress progress={normalizedProgress} styles={styles} />

        <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
          <CourseMeta icon={Clock3} value={duration} />
          <CourseMeta icon={BarChart3} value={level} />
        </div>
      </div>
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
    <div
      className={clsx(
        "relative flex h-36 items-center justify-center",
        styles.glow
      )}
    >
      <span className="absolute right-3 top-3 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
        {status}
      </span>

      <Icon className={clsx("size-20", styles.icon)} />
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
    <div className="flex items-center gap-1.5">
      <Icon className="size-4" />
      {value}
    </div>
  );
}
