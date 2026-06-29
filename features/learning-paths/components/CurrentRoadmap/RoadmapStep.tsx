import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Check } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import type { RoadmapStep as RoadmapStepProps } from "../../types/learningPaths.types";

type RoadmapStepStatus = RoadmapStepProps["status"];

type RoadmapStepStyle = {
  badge: string;
  dot: string;
};

const statusStyles: Record<RoadmapStepStatus, RoadmapStepStyle> = {
  completed: {
    dot: "bg-emerald-400 text-white",
    badge: "bg-emerald-500/10 text-emerald-400",
  },
  current: {
    dot: "bg-violet-500 text-white ring-4 ring-violet-500/20",
    badge: "bg-violet-500/10 text-violet-400",
  },
  locked: {
    dot: "border-2 border-slate-500 bg-[#0b1220]",
    badge: "bg-slate-700/40 text-slate-400",
  },
};

export default function RoadmapStep({
  courseProgress,
  courseSlug,
  title,
  description,
  status,
}: RoadmapStepProps) {
  const styles = statusStyles[status];
  const canOpenCourse = status === "current" && courseSlug;

  return (
    <li className="relative flex min-w-0 items-start gap-4 py-2 sm:items-center sm:gap-5">
      <RoadmapDot status={status} styles={styles} />

      <div
        className={clsx(
          "flex min-w-0 flex-1 flex-col gap-4 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
          status === "current" && "bg-violet-500/10"
        )}
      >
        <div className="min-w-0">
          <h3 className="break-words font-semibold text-white">{title}</h3>
          <p className="mt-1 break-words text-sm leading-6 text-slate-400">
            {description}
          </p>

          {status === "current" && typeof courseProgress === "number" ? (
            <div className="mt-3 max-w-xs">
              <div className="mb-1 flex items-center justify-between gap-3 text-xs text-slate-400">
                <span>
                  <TranslatedText
                    fallback="Course progress"
                    translationKey="learningPaths.courseProgress"
                  />
                </span>
                <span>{courseProgress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-violet-500"
                  style={{ width: `${Math.min(courseProgress, 100)}%` }}
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <span
            className={clsx(
              "rounded-full px-3 py-1 text-xs font-medium",
              styles.badge
            )}
          >
            <RoadmapStatusLabel status={status} />
          </span>

          {canOpenCourse ? (
            <Link
              href={`/learn/courses/${courseSlug}`}
              className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-violet-600"
            >
              <TranslatedText
                fallback="Open course"
                translationKey="learningPaths.openCourse"
              />
              <ArrowRight className="size-3.5" />
            </Link>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function RoadmapStatusLabel({ status }: { status: RoadmapStepStatus }) {
  const labels: Record<
    RoadmapStepStatus,
    { fallback: string; translationKey: string }
  > = {
    completed: {
      fallback: "Completed",
      translationKey: "common.completed",
    },
    current: {
      fallback: "In Progress",
      translationKey: "common.inProgress",
    },
    locked: {
      fallback: "Locked",
      translationKey: "common.locked",
    },
  };
  const label = labels[status];

  return (
    <TranslatedText
      fallback={label.fallback}
      translationKey={label.translationKey}
    />
  );
}

type RoadmapDotProps = {
  status: RoadmapStepStatus;
  styles: RoadmapStepStyle;
};

function RoadmapDot({ status, styles }: RoadmapDotProps) {
  return (
    <div
      className={clsx(
        "relative z-10 flex size-6 shrink-0 items-center justify-center rounded-full",
        styles.dot
      )}
    >
      {status === "completed" && <Check className="size-4" />}
    </div>
  );
}
