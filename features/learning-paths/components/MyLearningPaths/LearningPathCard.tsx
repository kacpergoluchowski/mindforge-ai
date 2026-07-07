import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Brain,
  Clock3,
  Code2,
  GraduationCap,
  Layers3,
} from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
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
  slug,
  title,
  description,
  estimatedHours,
  level,
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
    <article className="group flex min-h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80 transition hover:border-violet-400/30 hover:bg-[#131f35]">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
        <div className="flex min-w-0 items-start gap-4">
          <PathIcon icon={icon} styles={styles} />
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-white">
              {title}
            </h3>
            <p className={clsx("mt-1 text-sm font-medium", styles.iconText)}>
              <TranslatedText
                fallback="{progress}% Complete"
                translationKey="learningPaths.percentComplete"
                values={{ progress: normalizedProgress }}
              />
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold text-slate-300">
          {level}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-2 text-sm leading-6 text-slate-400">
          {description}
        </p>

        <PathProgress progress={normalizedProgress} styles={styles} />

        <div className="mt-5 grid grid-cols-2 gap-3">
          <PathMeta
            icon={GraduationCap}
            label={
              <TranslatedText
                fallback="Courses"
                translationKey="learningPaths.courses"
              />
            }
            value={
              <TranslatedText
                fallback="{completed}/{total}"
                translationKey="learningPaths.coursesCompletedShort"
                values={{ completed: coursesCompleted, total: totalCourses }}
              />
            }
          />
          <PathMeta
            icon={Clock3}
            label={
              <TranslatedText
                fallback="Estimate"
                translationKey="learningPaths.estimate"
              />
            }
            value={`${estimatedHours ?? 0}h`}
          />
        </div>

        <Link
          href={slug ? `/learn/learning-paths/${slug}` : "/learn/learning-paths"}
          className={clsx(
            "mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.04] py-3.5 text-sm font-semibold transition hover:bg-white/[0.07]",
            styles.button
          )}
        >
          <TranslatedText
            fallback="Continue Learning"
            translationKey="learningPaths.continuePath"
          />
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
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
        "flex size-12 shrink-0 items-center justify-center rounded-2xl",
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
    <div className="mt-5">
      <div className="mb-2 flex items-center justify-between gap-3 text-xs text-slate-400">
        <span>
          <TranslatedText
            fallback="Roadmap progress"
            translationKey="learningPaths.roadmapProgress"
          />
        </span>
        <span className="font-semibold text-white">{progress}%</span>
      </div>
      <div
        aria-label="Learning path progress"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={progress}
        className="h-2 overflow-hidden rounded-full bg-slate-800"
        role="progressbar"
      >
        <div
          className={clsx("h-full rounded-full", styles.progress)}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

type PathMetaProps = {
  icon: typeof Clock3;
  label: ReactNode;
  value: ReactNode;
};

function PathMeta({ icon: Icon, label, value }: PathMetaProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
        <Icon className="size-4" />
        <span>{label}</span>
      </div>
      <p className="text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
