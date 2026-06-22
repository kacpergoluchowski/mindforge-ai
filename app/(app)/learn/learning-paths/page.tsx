import PageHeader from "@/components/shared/PageHeader";
import CurrentRoadmap from "@/features/learning-paths/components/CurrentRoadmap/CurrentRoadmap";
import MyLearningPaths from "@/features/learning-paths/components/MyLearningPaths/MyLearningPaths";
import PopularLearningPaths from "@/features/learning-paths/components/PopularLearningPaths/PopularLearningPaths";
import { Plus } from "lucide-react";

export default function LearningPathsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Learning Paths"
        subtitle="AI-powered roadmaps designed to help you master any skill."
        buttonVisible
        buttonText="Create AI Path"
        buttonIcon={Plus}
      />
      <MyLearningPaths />
      <PopularLearningPaths />
      <CurrentRoadmap />
    </div>
  );
}
