import CurrentRoadmap from "@/features/learning-paths/components/CurrentRoadmap";
import LearningPathsHero from "@/features/learning-paths/components/LearningPathsHero";
import MyLearningPaths from "@/features/learning-paths/components/MyLearningPaths";
import PopularLearningPaths from "@/features/learning-paths/components/PopularLearningPaths";

export default function LearningPathsPage() {
  return (
    <div className="space-y-8">
      <LearningPathsHero />
      <MyLearningPaths />
      <PopularLearningPaths /> 
      <CurrentRoadmap />
    </div>
  );
}