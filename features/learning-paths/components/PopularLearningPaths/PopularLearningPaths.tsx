import TranslatedText from "@/components/shared/TranslatedText";
import PopularLearningPathCard from "./PopularLearningPathCard";
import type { PopularLearningPath } from "../../types/learningPaths.types";

type PopularLearningPathsProps = {
  paths: PopularLearningPath[];
};

export default function PopularLearningPaths({
  paths,
}: PopularLearningPathsProps) {
  return (
    <section className="space-y-6 border-t border-white/10 pt-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            <TranslatedText
              fallback="Popular Learning Paths"
              translationKey="learningPaths.popularLearningPaths"
            />
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            <TranslatedText
              fallback="Start with curated roadmaps or generate your own AI path."
              translationKey="learningPaths.popularLearningPathsSubtitle"
            />
          </p>
        </div>

        {paths.length ? (
          <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm font-medium text-slate-300">
            <TranslatedText
              fallback="{count} available"
              translationKey="learningPaths.availablePathsCount"
              values={{ count: paths.length }}
            />
          </span>
        ) : null}
      </div>

      {paths.length ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {paths.map((path) => (
            <PopularLearningPathCard key={path.id} {...path} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/10 bg-[#111a2d]/70 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-white">
            <TranslatedText
              fallback="No paths available"
              translationKey="learningPaths.noPathsAvailableTitle"
            />
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            <TranslatedText
              fallback="Create your first AI-generated learning path."
              translationKey="learningPaths.noPathsAvailable"
            />
          </p>
        </div>
      )}
    </section>
  );
}
