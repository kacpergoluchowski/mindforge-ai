import TranslatedText from "@/components/shared/TranslatedText";
import LearningPathCard from "./LearningPathCard";
import type { LearningPath } from "../../types/learningPaths.types";

type MyLearningPathsProps = {
  paths: LearningPath[];
};

export default function MyLearningPaths({ paths }: MyLearningPathsProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            <TranslatedText
              fallback="My Learning Paths"
              translationKey="learningPaths.myLearningPaths"
            />
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            <TranslatedText
              fallback="Continue active roadmaps and unlock the next course step by step."
              translationKey="learningPaths.myLearningPathsSubtitle"
            />
          </p>
        </div>

        {paths.length ? (
          <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm font-medium text-slate-300">
            <TranslatedText
              fallback="{count} active"
              translationKey="learningPaths.activePathsCount"
              values={{ count: paths.length }}
            />
          </span>
        ) : null}
      </div>

      {paths.length ? (
        <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          {paths.map((path) => (
            <LearningPathCard key={path.id} {...path} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-white">
            <TranslatedText
              fallback="No active learning paths yet"
              translationKey="learningPaths.noActivePathsTitle"
            />
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            <TranslatedText
              fallback="Create an AI path or start one of the popular roadmaps below."
              translationKey="learningPaths.noActivePaths"
            />
          </p>
        </div>
      )}
    </section>
  );
}
