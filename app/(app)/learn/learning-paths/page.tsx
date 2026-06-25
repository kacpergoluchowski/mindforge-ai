import PageHeader from "@/components/shared/PageHeader";
import CurrentRoadmap from "@/features/learning-paths/components/CurrentRoadmap/CurrentRoadmap";
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
        title={currentPath?.title ?? "No active roadmap"}
        progress={currentPath?.progress ?? 0}
        steps={currentPath?.steps ?? []}
      />
    </div>
  );
}
