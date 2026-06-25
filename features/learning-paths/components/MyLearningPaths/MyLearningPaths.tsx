import SectionHeader from "@/components/shared/SectionHeader";
import { learningPaths } from "../../data/learningData";
import LearningPathCard from "./LearningPathCard";
import type { LearningPath } from "../../types/learningPaths.types";

type MyLearningPathsProps = {
  paths: LearningPath[];
};

export default function MyLearningPaths({ paths }: MyLearningPathsProps) {
  const visiblePaths = paths.length ? paths : learningPaths;

  return (
    <section className="space-y-6">
      <SectionHeader title="My Learning Paths" buttonText="View All" />

      <div className="grid gap-6 xl:grid-cols-3">
        {visiblePaths.map((path) => (
          <LearningPathCard key={path.id} {...path} />
        ))}
      </div>
    </section>
  );
}
