import SectionHeader from "@/components/shared/SectionHeader";
import TranslatedText from "@/components/shared/TranslatedText";
import LearningPathCard from "./LearningPathCard";
import type { LearningPath } from "../../types/learningPaths.types";

type MyLearningPathsProps = {
  paths: LearningPath[];
};

export default function MyLearningPaths({ paths }: MyLearningPathsProps) {
  return (
    <section className="space-y-6">
      <SectionHeader
        title={
          <TranslatedText
            fallback="My Learning Paths"
            translationKey="learningPaths.myLearningPaths"
          />
        }
        buttonText={
          <TranslatedText fallback="View All" translationKey="common.viewAll" />
        }
      />

      {paths.length ? (
        <div className="grid gap-6 xl:grid-cols-3">
          {paths.map((path) => (
            <LearningPathCard key={path.id} {...path} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm text-slate-400">
          <TranslatedText
            fallback="No active learning paths."
            translationKey="learningPaths.noActivePaths"
          />
        </div>
      )}
    </section>
  );
}
