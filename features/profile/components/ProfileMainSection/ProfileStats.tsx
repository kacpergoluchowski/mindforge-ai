import { profileStats } from "../../data/profileData";
import ProfileStatCard from "./ProfileStatCard";

import type { CurrentProfile } from "../../types/profile.types";

type ProfileStatsProps = {
  profile: CurrentProfile;
};

export default function ProfileStats({ profile }: ProfileStatsProps) {
  const xpProgress =
    profile.xpGoal > 0 ? Math.min((profile.xp / profile.xpGoal) * 100, 100) : 0;
  const stats = profileStats.map((stat) => {
    if (stat.subtitle === "Advanced Learner") {
      return {
        ...stat,
        title: `Level ${profile.level}`,
        subtitle: `${profile.xp.toLocaleString()} XP earned`,
        progress: xpProgress,
      };
    }

    if (stat.subtitle === "Day Streak") {
      return {
        ...stat,
        title: String(profile.streakDays),
      };
    }

    return stat;
  });

  return (
    <section className="grid gap-6 xl:grid-cols-4">
      {stats.map((stat) => (
        <ProfileStatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
}
