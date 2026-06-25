import clsx from "clsx";
import { ArrowRight, Brain, Code2, Layers3, MoreVertical } from "lucide-react";

import type { LearningPath } from "../../types/learningPaths.types";

type LearningPathColor = LearningPath["color"];

type LearningPathColorStyle = {
  button: string;
  iconBg: string;
  iconText: string;
  progress: string;
};

const colorStyles: Record<LearningPathColor, LearningPathColorStyle> = {
  violet: {
    iconBg: "bg-violet-500/20",
    iconText: "text-violet-400",
    progress: "bg-violet-500",
    button: "text-violet-400",
  },
  emerald: {
    iconBg: "bg-emerald-500/20",
    iconText: "text-emerald-400",
    progress: "bg-emerald-500",
    button: "text-emerald-400",
  },
  orange: {
    iconBg: "bg-orange-500/20",
    iconText: "text-orange-400",
    progress: "bg-orange-500",
    button: "text-orange-400",
  },
};

const iconMap = {
  brain: Brain,
  code: Code2,
  layers: Layers3,
};

export default function LearningPathCard({
  title,
  progress,
  coursesCompleted,
  totalCourses,
  color,
  iconName,
}: LearningPath) {
  const styles = colorStyles[color];
  const normalizedProgress = Math.min(progress, 100);
  const icon = iconMap[iconName as keyof typeof iconMap] ?? Code2;

  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
      <div className="mb-8 flex items-center justify-between">
        <PathIcon icon={icon} styles={styles} />

        <button type="button">
          <MoreVertical className="size-5 text-slate-500" />
        </button>
      </div>

      <h3 className="text-xl font-semibold text-white">{title}</h3>

      <p className={clsx("mt-2 text-sm", styles.iconText)}>
        {normalizedProgress}% Complete
      </p>

      <PathProgress progress={normalizedProgress} styles={styles} />

      <p className="mt-5 text-sm text-slate-400">
        {coursesCompleted} / {totalCourses} Courses
      </p>

      <button
        type="button"
        className={clsx(
          "mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.03] py-4 font-medium transition hover:bg-white/[0.05]",
          styles.button
        )}
      >
        Continue Learning
        <ArrowRight className="size-4" />
      </button>
    </article>
  );
}

type PathIconProps = {
  icon: typeof Code2;
  styles: LearningPathColorStyle;
};

function PathIcon({ icon: Icon, styles }: PathIconProps) {
  return (
    <div
      className={clsx(
        "flex size-12 items-center justify-center rounded-full",
        styles.iconBg
      )}
    >
      <Icon className={clsx("size-5", styles.iconText)} />
    </div>
  );
}

type PathProgressProps = {
  progress: number;
  styles: LearningPathColorStyle;
};

function PathProgress({ progress, styles }: PathProgressProps) {
  return (
    <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
      <div
        className={clsx("h-full rounded-full", styles.progress)}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
