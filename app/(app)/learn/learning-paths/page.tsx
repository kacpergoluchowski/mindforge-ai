import PageHeader from "@/components/shared/PageHeader";
import CurrentRoadmap from "@/features/learning-paths/components/CurrentRoadmap/CurrentRoadmap";
import { roadmapSteps } from "@/features/learning-paths/data/learningData";
import { getLearningPaths } from "@/features/learning-paths/api/getLearningPaths";
import MyLearningPaths from "@/features/learning-paths/components/MyLearningPaths/MyLearningPaths";
import PopularLearningPaths from "@/features/learning-paths/components/PopularLearningPaths/PopularLearningPaths";
import { Plus } from "lucide-react";

export default async function LearningPathsPage() {
  const { myPaths, popularPaths, currentPath } = await getLearningPaths();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Learning Paths"
        subtitle="AI-powered roadmaps designed to help you master any skill."
        action={{
          label: "Create AI Path",
          icon: Plus,
        }}
      />
      <MyLearningPaths paths={myPaths} />
      <PopularLearningPaths paths={popularPaths} />
      <CurrentRoadmap
        title={currentPath?.title ?? "Frontend Engineer Roadmap"}
        progress={currentPath?.progress ?? 63}
        steps={currentPath?.steps ?? roadmapSteps}
      />
    </div>
  );
}
