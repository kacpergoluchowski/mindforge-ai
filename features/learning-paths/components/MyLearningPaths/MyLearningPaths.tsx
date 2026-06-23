import SectionHeader from "@/components/shared/SectionHeader";
import { learningPaths } from "../../data/learningData";
import LearningPathCard from "./LearningPathCard";

export default function MyLearningPaths() {
  return (
    <section className="space-y-6">
      <SectionHeader title="My Learning Paths" buttonText="View All" />

      <div className="grid gap-6 xl:grid-cols-3">
        {learningPaths.map((path) => (
          <LearningPathCard key={path.id} {...path} />
        ))}
      </div>
    </section>
  );
}