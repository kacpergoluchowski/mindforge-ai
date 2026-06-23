import ChallengeStreak from "./ChallengeStreak";
import FeaturedChallenges from "./FeaturedChallenges";
import WeeklyLeaderboard from "./WeeklyLeaderboard";

export default function ChallengesMainSection() {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <FeaturedChallenges />

      <div className="space-y-6">
        <WeeklyLeaderboard />
        <ChallengeStreak />
      </div>
    </section>
  );
}