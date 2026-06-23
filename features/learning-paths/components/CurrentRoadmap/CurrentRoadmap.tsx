import { roadmapSteps } from "../../data/learningData";
import RoadmapStep from "./RoadmapStep";

type CurrentRoadmapProps = {
  title: string;
  progress: number;
};

export default function CurrentRoadmap({
  title,
  progress,
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
        <div className="absolute left-3 top-2 h-[calc(100%-1rem)] w-px bg-slate-700" />

        <ul>
          {roadmapSteps.map((step) => (
            <RoadmapStep key={step.id} {...step} />
          ))}
        </ul>
      </div>
    </section>
  );
}