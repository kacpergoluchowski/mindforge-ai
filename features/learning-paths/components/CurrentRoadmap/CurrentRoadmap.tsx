import TranslatedText from "@/components/shared/TranslatedText";
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
    <section
      id="current-roadmap"
      className="min-w-0 rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:p-6"
    >
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText
            fallback="Current Roadmap"
            translationKey="learningPaths.currentRoadmap"
          />
        </h2>

        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          <span className="text-sm text-slate-400">
            {title}
          </span>

          <span className="rounded-full bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-400">
            <TranslatedText
              fallback="{progress}% Complete"
              translationKey="learningPaths.percentComplete"
              values={{ progress }}
            />
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
            <TranslatedText
              fallback="No roadmap selected."
              translationKey="learningPaths.noRoadmapSelected"
            />
          </div>
        )}
      </div>
    </section>
  );
}
