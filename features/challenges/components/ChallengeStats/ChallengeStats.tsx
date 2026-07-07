import { getChallengeStats } from "../../api/getChallenges";
import { challengeStats } from "../../data/challengesData";
import ChallengeStatCard from "./ChallengeStatCard";

export default async function ChallengeStats() {
  const userStats = await getChallengeStats();
  const stats = userStats.length ? userStats : challengeStats;

  return (
    <section className="min-w-0">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <ChallengeStatCard key={stat.id} {...stat} />
        ))}
      </div>
    </section>
  );
}
