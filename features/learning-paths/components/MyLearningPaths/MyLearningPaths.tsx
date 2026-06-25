import SectionHeader from "@/components/shared/SectionHeader";
import LearningPathCard from "./LearningPathCard";
import type { LearningPath } from "../../types/learningPaths.types";

type MyLearningPathsProps = {
  paths: LearningPath[];
};

export default function MyLearningPaths({ paths }: MyLearningPathsProps) {
  return (
    <section className="space-y-6">
      <SectionHeader title="My Learning Paths" buttonText="View All" />

      {paths.length ? (
        <div className="grid gap-6 xl:grid-cols-3">
          {paths.map((path) => (
            <LearningPathCard key={path.id} {...path} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-slate-400">
          No active learning paths.
        </div>
      )}
    </section>
  );
}
