import SectionHeader from "@/components/shared/SectionHeader";
import PopularLearningPathCard from "./PopularLearningPathCard";
import type { PopularLearningPath } from "../../types/learningPaths.types";

type PopularLearningPathsProps = {
  paths: PopularLearningPath[];
};

export default function PopularLearningPaths({
  paths,
}: PopularLearningPathsProps) {
  return (
    <section className="space-y-6 border-t border-white/10 pt-6">
      <SectionHeader title="Popular Learning Paths" buttonText="View All" />

      {paths.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {paths.map((path) => (
            <PopularLearningPathCard key={path.id} {...path} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#111a2d]/80 p-6 text-sm text-slate-400">
          No learning paths available.
        </div>
      )}
    </section>
  );
}
