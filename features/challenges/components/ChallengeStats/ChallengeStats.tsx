import { challengeStats } from "../../data/challengesData";
import ChallengeStatCard from "./ChallengeStatCard";

export default function ChallengeStats() {
  return (
    <section>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {challengeStats.map((stat) => (
          <ChallengeStatCard key={stat.id} {...stat} />
        ))}
      </div>
    </section>
  );
}