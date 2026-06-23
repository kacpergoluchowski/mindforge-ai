import SectionHeader from "@/components/shared/SectionHeader";
import { continueLearningCourses } from "../../data/coursesData";
import ContinueLearningCard from "./ContinueLearningCard";

export default function ContinueLearning() {
  return (
    <section className="space-y-5">
      <SectionHeader title="Continue Learning" buttonText="View All" />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {continueLearningCourses.map((course) => (
          <ContinueLearningCard key={course.id} {...course} />
        ))}
      </div>
    </section>
  );
}
