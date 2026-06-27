import Link from "next/link";
import clsx from "clsx";
import { ArrowRight, Check, Lock, Play } from "lucide-react";

import type { RoadmapStep } from "../../types/learningPaths.types";

type LearningPathTreeStepProps = {
  index: number;
  step: RoadmapStep;
};

const statusStyles: Record<
  RoadmapStep["status"],
  StepStyle
> = {
  completed: {
    badge: "bg-emerald-500/10 text-emerald-300",
    node: "bg-emerald-500 text-white shadow-emerald-500/30",
    panel: "border-emerald-400/20 bg-emerald-500/10",
    label: "Completed",
  },
  current: {
    badge: "bg-violet-500/10 text-violet-300",
    node: "bg-violet-500 text-white shadow-violet-500/40 ring-8 ring-violet-500/10",
    panel: "border-violet-400/30 bg-violet-500/10",
    label: "Current",
  },
  locked: {
    badge: "bg-slate-700/40 text-slate-400",
    node: "border border-slate-600 bg-[#0b1220] text-slate-500",
    panel: "border-white/10 bg-[#111a2d]/70",
    label: "Locked",
  },
};

type StepStyle = {
  badge: string;
  node: string;
  panel: string;
  label: string;
};

export default function LearningPathTreeStep({
  index,
  step,
}: LearningPathTreeStepProps) {
  const styles = statusStyles[step.status];
  const isRight = index % 2 === 1;
  const canOpenCourse = step.status !== "locked" && step.courseSlug;

  return (
    <li
      className={clsx(
        "relative grid min-w-0 gap-4 md:grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)]",
        isRight ? "md:[&>article]:col-start-3" : "md:[&>article]:col-start-1"
      )}
    >
      <div className="absolute left-6 top-6 z-10 md:left-1/2 md:-translate-x-1/2">
        <StepNode status={step.status} styles={styles} />
      </div>

      <article
        className={clsx(
          "ml-16 min-w-0 rounded-3xl border p-5 md:ml-0",
          styles.panel
        )}
      >
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <span
              className={clsx(
                "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                styles.badge
              )}
            >
              Step {index + 1} - {styles.label}
            </span>

            <h3 className="mt-4 break-words text-lg font-semibold text-white">
              {step.title}
            </h3>

            <p className="mt-2 break-words text-sm leading-6 text-slate-400">
              {step.description}
            </p>
          </div>

          {canOpenCourse ? (
            <Link
              href={`/learn/courses/${step.courseSlug}`}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Open course
              <ArrowRight className="size-4" />
            </Link>
          ) : null}
        </div>

        {step.status === "current" ? (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs text-slate-400">
              <span>Course progress</span>
              <span>{step.courseProgress ?? 0}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-violet-500"
                style={{ width: `${Math.min(step.courseProgress ?? 0, 100)}%` }}
              />
            </div>
          </div>
        ) : null}
      </article>
    </li>
  );
}

type StepNodeProps = {
  status: RoadmapStep["status"];
  styles: StepStyle;
};

function StepNode({ status, styles }: StepNodeProps) {
  return (
    <div
      className={clsx(
        "flex size-12 items-center justify-center rounded-2xl shadow-2xl",
        styles.node
      )}
    >
      {status === "completed" ? <Check className="size-6" /> : null}
      {status === "current" ? <Play className="size-5 fill-current" /> : null}
      {status === "locked" ? <Lock className="size-5" /> : null}
    </div>
  );
}
