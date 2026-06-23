import SectionHeader from "@/components/shared/SectionHeader";
import { popularLearningPaths } from "../../data/learningData";
import PopularLearningPathCard from "./PopularLearningPathCard";

export default function PopularLearningPaths() {
  return (
    <section className="space-y-6 border-t border-white/10 pt-6">
      <SectionHeader title="Popular Learning Paths" buttonText="View All" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {popularLearningPaths.map((path) => (
          <PopularLearningPathCard key={path.id} {...path} />
        ))}
      </div>
    </section>
  );
}
