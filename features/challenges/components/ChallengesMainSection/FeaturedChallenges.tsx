import { ChevronDown } from "lucide-react";

import TranslatedText from "@/components/shared/TranslatedText";
import { getFeaturedChallenges } from "../../api/getChallenges";
import FeaturedChallengeCard from "./FeaturedChallengeCard";

export default async function FeaturedChallenges() {
  const challenges = await getFeaturedChallenges();

  return (
    <section id="featured-challenges" className="scroll-mt-24 space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            <TranslatedText
              fallback="Featured Challenges"
              translationKey="challenges.featuredChallenges"
            />
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            <TranslatedText
              fallback="Solve practical tasks, verify your solution with AI and earn XP."
              translationKey="challenges.featuredChallengesSubtitle"
            />
          </p>
        </div>

        <span className="w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-sm font-medium text-slate-300">
          <TranslatedText
            fallback="{count} available"
            translationKey="challenges.availableChallengesCount"
            values={{ count: challenges.length }}
          />
        </span>
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
