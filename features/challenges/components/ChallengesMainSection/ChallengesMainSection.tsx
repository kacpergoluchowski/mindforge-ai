import ChallengeStreak from "./ChallengeStreak";
import FeaturedChallenges from "./FeaturedChallenges";
import WeeklyLeaderboard from "./WeeklyLeaderboard";

import type { CurrentProfile } from "@/features/profile/types/profile.types";

type ChallengesMainSectionProps = {
  profile: CurrentProfile | null;
};

export default function ChallengesMainSection({
  profile,
}: ChallengesMainSectionProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <FeaturedChallenges />

      <div className="space-y-6">
        <WeeklyLeaderboard profile={profile} />
        <ChallengeStreak />
      </div>
    </section>
  );
}
