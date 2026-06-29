import { ChevronDown } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import { getFeaturedChallenges } from "../../api/getChallenges";
import FeaturedChallengeCard from "./FeaturedChallengeCard";

export default async function FeaturedChallenges() {
  const challenges = await getFeaturedChallenges();

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          <TranslatedText
            fallback="Featured Challenges"
            translationKey="challenges.featuredChallenges"
          />
        </h2>

        <button
          type="button"
          className="text-sm text-slate-300 transition hover:text-white"
        >
          <TranslatedText fallback="View all" translationKey="common.viewAll" />
        </button>
      </div>

      <div className="space-y-5">
        {challenges.map((challenge) => (
          <FeaturedChallengeCard
            key={challenge.id}
            {...challenge}
          />
        ))}
      </div>

      <button
        type="button"
        className="
          flex w-full items-center justify-center gap-2
          rounded-2xl
          border border-white/10
          bg-white/[0.02]
          py-3
          text-slate-300
          transition
          hover:bg-white/[0.05]
          hover:text-white
        "
      >
        <TranslatedText
          fallback="Load More Challenges"
          translationKey="challenges.loadMore"
        />
        <ChevronDown className="size-4" />
      </button>
    </section>
  );
}
