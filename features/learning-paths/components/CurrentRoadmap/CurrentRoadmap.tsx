import RoadmapStep from "./RoadmapStep";
import type { RoadmapStep as RoadmapStepItem } from "../../types/learningPaths.types";

type CurrentRoadmapProps = {
  title: string;
  progress: number;
  steps: RoadmapStepItem[];
};

export default function CurrentRoadmap({
  title,
  progress,
  steps,
}: CurrentRoadmapProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-white">Current Roadmap</h2>

        <div className="flex items-center gap-8">
          <span className="hidden text-sm text-slate-400 md:inline">
            {title}
          </span>

          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-400">
            {progress}% Complete
          </span>
        </div>
      </div>

      <div className="relative">
        {steps.length ? (
          <div className="absolute left-3 top-2 h-[calc(100%-1rem)] w-px bg-slate-700" />
        ) : null}

        {steps.length ? (
          <ul>
            {steps.map((step) => (
              <RoadmapStep key={step.id} {...step} />
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-slate-400">
            No roadmap selected.
          </div>
        )}
      </div>
    </section>
  );
}
