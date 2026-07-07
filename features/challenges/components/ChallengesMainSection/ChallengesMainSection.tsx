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
    <section className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.75fr)]">
      <FeaturedChallenges />

      <div className="min-w-0 space-y-6">
        <WeeklyLeaderboard profile={profile} />
        <ChallengeStreak />
      </div>
    </section>
  );
}
