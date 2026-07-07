import Link from "next/link";
import clsx from "clsx";
import {
  ArrowRight,
  BookOpen,
  Check,
  CircleDot,
  Lock,
  Play,
  Sparkles,
} from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import { generateCourseForRoadmapStep } from "../../actions/roadmapCourseActions";
import type { RoadmapStep } from "../../types/learningPaths.types";
import GenerateStepCourseButton from "./GenerateStepCourseButton";

type LearningPathTreeStepProps = {
  index: number;
  pathSlug: string;
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
    iconBox: "bg-emerald-500/10 text-emerald-300",
  },
  current: {
    badge: "bg-violet-500/10 text-violet-300",
    node: "bg-violet-500 text-white shadow-violet-500/40 ring-8 ring-violet-500/10",
    panel: "border-violet-400/30 bg-violet-500/10",
    iconBox: "bg-violet-500/10 text-violet-300",
  },
  locked: {
    badge: "bg-slate-700/40 text-slate-400",
    node: "border border-slate-600 bg-[#0b1220] text-slate-500",
    panel: "border-white/10 bg-[#111a2d]/70",
    iconBox: "bg-slate-700/40 text-slate-400",
  },
};

type StepStyle = {
  badge: string;
  iconBox: string;
  node: string;
  panel: string;
};

export default function LearningPathTreeStep({
  index,
  pathSlug,
  step,
}: LearningPathTreeStepProps) {
  const styles = statusStyles[step.status];
  const isRight = index % 2 === 1;
  const canOpenCourse = step.status !== "locked" && step.courseSlug;
  const canGenerateCourse = step.status === "current" && !step.courseSlug;
  const hasProgress = Boolean(step.courseSlug);

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
          "ml-16 min-w-0 overflow-hidden rounded-3xl border md:ml-0",
          styles.panel
        )}
      >
        <div className="flex min-w-0 flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <span
              className={clsx(
                "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                styles.badge
              )}
            >
              <TranslatedText
                fallback="Step {number}"
                translationKey="learningPaths.stepNumber"
                values={{ number: index + 1 }}
              />
            </span>

            <div className="mt-4 flex min-w-0 items-start gap-3">
              <div
                className={clsx(
                  "hidden size-11 shrink-0 items-center justify-center rounded-2xl sm:flex",
                  styles.iconBox
                )}
              >
                {step.status === "completed" ? (
                  <Check className="size-5" />
                ) : null}
                {step.status === "current" ? (
                  <CircleDot className="size-5" />
                ) : null}
                {step.status === "locked" ? <Lock className="size-5" /> : null}
              </div>

              <div className="min-w-0">
                <h3 className="break-words text-lg font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-2 break-words text-sm leading-6 text-slate-400">
                  {step.description}
                </p>
              </div>
            </div>
          </div>

          <span
            className={clsx(
              "inline-flex w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
              styles.badge
            )}
          >
            <StepStatusLabel status={step.status} />
          </span>
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          {hasProgress ? (
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between gap-3 text-xs text-slate-400">
                <span>
                  <TranslatedText
                    fallback="Course progress"
                    translationKey="learningPaths.courseProgress"
                  />
                </span>
                <span>{step.courseProgress ?? 0}%</span>
              </div>
              <div
                aria-label="Course progress"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={step.courseProgress ?? 0}
                className="h-2 overflow-hidden rounded-full bg-slate-800"
                role="progressbar"
              >
                <div
                  className="h-full rounded-full bg-violet-500"
                  style={{ width: `${Math.min(step.courseProgress ?? 0, 100)}%` }}
                />
              </div>
            </div>
          ) : null}

          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <StepHint step={step} />

            {canOpenCourse ? (
              <Link
                href={`/learn/courses/${step.courseSlug}`}
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-600 sm:w-auto"
              >
                <TranslatedText
                  fallback="Open course"
                  translationKey="learningPaths.openCourse"
                />
                <ArrowRight className="size-4" />
              </Link>
            ) : null}

            {canGenerateCourse ? (
              <form action={generateCourseForRoadmapStep} className="w-full shrink-0 sm:w-auto">
                <input type="hidden" name="stepId" value={String(step.id)} />
                <input type="hidden" name="pathSlug" value={pathSlug} />
                <GenerateStepCourseButton />
              </form>
            ) : null}
          </div>
        </div>
      </article>
    </li>
  );
}

function StepHint({ step }: { step: RoadmapStep }) {
  if (step.status === "locked") {
    return (
      <p className="flex min-w-0 items-center gap-2 text-sm text-slate-500">
        <Lock className="size-4 shrink-0" />
        <TranslatedText
          fallback="Complete the previous step to unlock this one."
          translationKey="learningPaths.lockedStepHint"
        />
      </p>
    );
  }

  if (step.courseSlug) {
    return (
      <p className="flex min-w-0 items-center gap-2 text-sm text-slate-400">
        <BookOpen className="size-4 shrink-0 text-violet-300" />
        <TranslatedText
          fallback="Course is ready."
          translationKey="learningPaths.courseReady"
        />
      </p>
    );
  }

  return (
    <p className="flex min-w-0 items-center gap-2 text-sm text-slate-400">
      <Sparkles className="size-4 shrink-0 text-violet-300" />
      <TranslatedText
        fallback="Generate a course for this step."
        translationKey="learningPaths.generateStepHint"
      />
    </p>
  );
}

function StepStatusLabel({ status }: { status: RoadmapStep["status"] }) {
  const labels: Record<
    RoadmapStep["status"],
    { fallback: string; translationKey: string }
  > = {
    completed: {
      fallback: "Completed",
      translationKey: "common.completed",
    },
    current: {
      fallback: "Current",
      translationKey: "learningPaths.current",
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
