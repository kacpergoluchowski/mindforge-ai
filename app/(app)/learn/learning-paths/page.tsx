import { getLearningPaths } from "@/features/learning-paths/api/getLearningPaths";
import GenerateRoadmapSection from "@/features/learning-paths/components/GenerateRoadmap/GenerateRoadmapSection";
import MyLearningPaths from "@/features/learning-paths/components/MyLearningPaths/MyLearningPaths";
import PopularLearningPaths from "@/features/learning-paths/components/PopularLearningPaths/PopularLearningPaths";

export const metadata = {
  title: "Learning Paths",
};

export default async function LearningPathsPage() {
  const { myPaths, popularPaths } = await getLearningPaths();

  return (
    <div className="space-y-8">
      <GenerateRoadmapSection />
      <MyLearningPaths paths={myPaths} />
      <PopularLearningPaths paths={popularPaths} />
    </div>
  );
}
