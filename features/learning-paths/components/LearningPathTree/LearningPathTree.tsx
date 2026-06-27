import { Clock3, GraduationCap, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { LearningPathDetails } from "../../types/learningPaths.types";
import LearningPathTreeStep from "./LearningPathTreeStep";

type LearningPathTreeProps = {
  path: LearningPathDetails;
};

export default function LearningPathTree({ path }: LearningPathTreeProps) {
  return (
    <div className="min-w-0 space-y-8">
      <section className="min-w-0 rounded-3xl border border-white/10 bg-[#111a2d]/80 p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            <span className="inline-flex rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
              Learning Path
            </span>

            <h1 className="mt-5 break-words text-3xl font-bold text-white lg:text-4xl">
              {path.title}
            </h1>

            <p className="mt-4 max-w-2xl break-words text-sm leading-7 text-slate-400 sm:text-base">
              {path.description}
            </p>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-3 lg:w-[420px]">
            <PathStat
              icon={Route}
              label="Progress"
              value={`${path.progress}%`}
            />
            <PathStat
              icon={GraduationCap}
              label="Courses"
              value={`${path.coursesCompleted}/${path.totalCourses}`}
            />
            <PathStat
              icon={Clock3}
              label="Estimate"
              value={`${path.estimatedHours}h`}
            />
          </div>
        </div>

        <div className="mt-8 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-violet-500"
            style={{ width: `${Math.min(path.progress, 100)}%` }}
          />
        </div>
      </section>

      <section className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:p-6 lg:p-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Path Tree</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Complete steps one by one to unlock the next stage.
            </p>
          </div>

          <span className="w-fit rounded-full bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-300">
            {path.started ? "Active path" : "Not started"}
          </span>
        </div>

        {path.steps.length ? (
          <ol className="relative mx-auto max-w-5xl space-y-8">
            <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-slate-700 md:left-1/2" />

            {path.steps.map((step, index) => (
              <LearningPathTreeStep
                key={step.id}
                index={index}
                step={step}
              />
            ))}
          </ol>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-slate-400">
            This path has no steps yet.
          </div>
        )}
      </section>
    </div>
  );
}

type PathStatProps = {
  icon: LucideIcon;
  label: string;
  value: string;
};

function PathStat({ icon: Icon, label, value }: PathStatProps) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
        <Icon className="size-5" />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="break-words font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
