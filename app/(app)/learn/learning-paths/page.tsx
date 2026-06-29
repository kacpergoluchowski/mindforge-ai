import PageHeader from "@/components/shared/PageHeader";
import TranslatedText from "@/components/shared/TranslatedText";
import { getLearningPaths } from "@/features/learning-paths/api/getLearningPaths";
import MyLearningPaths from "@/features/learning-paths/components/MyLearningPaths/MyLearningPaths";
import PopularLearningPaths from "@/features/learning-paths/components/PopularLearningPaths/PopularLearningPaths";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Learning Paths",
};

export default async function LearningPathsPage() {
  const { myPaths, popularPaths } = await getLearningPaths();

  return (
    <div className="space-y-8">
      <PageHeader
        title={
          <TranslatedText
            translationKey="learningPaths.title"
            fallback="Learning Paths"
          />
        }
        subtitle={
          <TranslatedText
            translationKey="learningPaths.subtitle"
            fallback="AI-powered roadmaps designed to help you master any skill."
          />
        }
        action={{
          label: (
            <TranslatedText
              translationKey="learningPaths.createPath"
              fallback="Create AI Path"
            />
          ),
          icon: Plus,
        }}
      />
      <MyLearningPaths paths={myPaths} />
      <PopularLearningPaths paths={popularPaths} />
    </div>
  );
}
