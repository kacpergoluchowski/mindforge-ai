import {
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  LockKeyhole,
  Route,
  Sparkles,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import TranslatedText from "@/components/shared/TranslatedText";
import type { LearningPathDetails } from "../../types/learningPaths.types";
import LearningPathTreeStep from "./LearningPathTreeStep";

type LearningPathTreeProps = {
  path: LearningPathDetails;
};

export default function LearningPathTree({ path }: LearningPathTreeProps) {
  const completedSteps = path.steps.filter(
    (step) => step.status === "completed"
  ).length;
  const lockedSteps = path.steps.filter((step) => step.status === "locked")
    .length;
  const generatedCourses = path.steps.filter((step) => step.courseSlug).length;
  const currentStep = path.steps.find((step) => step.status === "current");

  return (
    <div className="min-w-0 space-y-6 lg:space-y-8">
      <section className="relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%)]" />

        <div className="relative grid gap-7 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-end">
          <div className="min-w-0 max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              <Route className="size-3.5" />
              <TranslatedText
                fallback="Learning Path"
                translationKey="learningPaths.learningPath"
              />
            </span>

            <h1 className="mt-5 break-words text-3xl font-bold leading-tight text-white lg:text-4xl">
              {path.title}
            </h1>

            <p className="mt-4 max-w-2xl break-words text-sm leading-7 text-slate-400 sm:text-base">
              {path.description}
            </p>
          </div>

          <div className="min-w-0 rounded-3xl border border-white/10 bg-[#0b1220]/70 p-4 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-300">
                  <TranslatedText
                    fallback="Current step"
                    translationKey="learningPaths.currentStep"
                  />
                </p>
                <h2 className="mt-2 line-clamp-2 text-lg font-semibold text-white">
                  {currentStep?.title ?? (
                    <TranslatedText
                      fallback="Path completed"
                      translationKey="learningPaths.pathCompleted"
                    />
                  )}
                </h2>
              </div>

              <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                <Target className="size-5" />
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="text-slate-400">
                  <TranslatedText
                    fallback="Overall progress"
                    translationKey="learningPaths.overallProgress"
                  />
                </span>
                <span className="font-semibold text-white">{path.progress}%</span>
              </div>
              <div
                aria-label="Learning path progress"
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={path.progress}
                className="h-2.5 overflow-hidden rounded-full bg-slate-800"
                role="progressbar"
              >
                <div
                  className="h-full rounded-full bg-violet-500"
                  style={{ width: `${Math.min(path.progress, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-6 grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <PathStat
            icon={CheckCircle2}
            label={
              <TranslatedText
                fallback="Completed"
                translationKey="learningPaths.completedSteps"
              />
            }
            value={`${completedSteps}/${path.steps.length}`}
            tone="emerald"
          />
          <PathStat
            icon={GraduationCap}
            label={
              <TranslatedText
                fallback="Courses"
                translationKey="learningPaths.courses"
              />
            }
            value={`${path.coursesCompleted}/${path.totalCourses}`}
            tone="violet"
          />
          <PathStat
            icon={BookOpen}
            label={
              <TranslatedText
                fallback="Generated"
                translationKey="learningPaths.generatedCourses"
              />
            }
            value={`${generatedCourses}/${path.steps.length}`}
            tone="blue"
          />
          <PathStat
            icon={Clock3}
            label={
              <TranslatedText
                fallback="Estimate"
                translationKey="learningPaths.estimate"
              />
            }
            value={`${path.estimatedHours}h`}
            tone="orange"
          />
        </div>
      </section>

      <section className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 lg:p-8">
        <div className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <h2 className="text-xl font-semibold text-white">
              <TranslatedText
                fallback="Path Tree"
                translationKey="learningPaths.pathTree"
              />
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              <TranslatedText
                fallback="Complete steps one by one to unlock the next stage."
                translationKey="learningPaths.pathTreeSubtitle"
              />
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:w-[440px]">
            <TreeSummaryItem
              icon={Sparkles}
              label={
                <TranslatedText
                  fallback="Status"
                  translationKey="learningPaths.pathStatus"
                />
              }
              value={
                path.started ? (
                  <TranslatedText
                    fallback="Active"
                    translationKey="learningPaths.activePath"
                  />
                ) : (
                  <TranslatedText
                    fallback="Not started"
                    translationKey="learningPaths.notStarted"
                  />
                )
              }
            />
            <TreeSummaryItem
              icon={CheckCircle2}
              label={
                <TranslatedText
                  fallback="Done"
                  translationKey="learningPaths.done"
                />
              }
              value={String(completedSteps)}
            />
            <TreeSummaryItem
              icon={LockKeyhole}
              label={
                <TranslatedText
                  fallback="Locked"
                  translationKey="learningPaths.lockedSteps"
                />
              }
              value={String(lockedSteps)}
            />
          </div>
        </div>

        {path.steps.length ? (
          <ol className="relative mx-auto max-w-5xl space-y-8">
            <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-slate-700/80 md:left-1/2" />

            {path.steps.map((step, index) => (
              <LearningPathTreeStep
                key={step.id}
                index={index}
                pathSlug={path.slug}
                step={step}
              />
            ))}
          </ol>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-slate-400">
            <TranslatedText
              fallback="This path has no steps yet."
              translationKey="learningPaths.noSteps"
            />
          </div>
        )}
      </section>
    </div>
  );
}

type PathStatProps = {
  icon: LucideIcon;
  label: ReactNode;
  tone: "blue" | "emerald" | "orange" | "violet";
  value: string;
};

const statToneStyles: Record<PathStatProps["tone"], string> = {
  blue: "bg-sky-500/10 text-sky-300",
  emerald: "bg-emerald-500/10 text-emerald-300",
  orange: "bg-orange-500/10 text-orange-300",
  violet: "bg-violet-500/10 text-violet-300",
};

function PathStat({ icon: Icon, label, tone, value }: PathStatProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-[#0b1220]/60 p-4">
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${statToneStyles[tone]}`}
      >
        <Icon className="size-5" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="break-words font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

type TreeSummaryItemProps = {
  icon: LucideIcon;
  label: ReactNode;
  value: ReactNode;
};

function TreeSummaryItem({ icon: Icon, label, value }: TreeSummaryItemProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-[#111a2d]/70 p-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-slate-500">{label}</p>
        <p className="truncate text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
