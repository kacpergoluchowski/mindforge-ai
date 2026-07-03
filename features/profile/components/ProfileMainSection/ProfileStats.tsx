import { profileStats } from "../../data/profileData";
import ProfileStatCard from "./ProfileStatCard";

import TranslatedText from "@/components/shared/TranslatedText";
import { getLevelingProgress } from "@/lib/learning/leveling";
import type { CurrentProfile } from "../../types/profile.types";

type ProfileStatsProps = {
  profile: CurrentProfile;
};

export default function ProfileStats({ profile }: ProfileStatsProps) {
  const leveling = getLevelingProgress(profile.xp);
  const stats = profileStats.map((stat) => {
    if (stat.subtitle === "Advanced Learner") {
      return {
        ...stat,
        title: (
          <TranslatedText
            fallback="Level {level}"
            translationKey="profile.stats.level"
            values={{ level: profile.level }}
          />
        ),
        subtitle: (
          <TranslatedText
            fallback="{xp} XP earned"
            translationKey="profile.stats.xpEarned"
            values={{ xp: profile.xp.toLocaleString() }}
          />
        ),
        progress: leveling.progressPercent,
      };
    }

    if (stat.subtitle === "Total Learning Time") {
      return {
        ...stat,
        subtitle: (
          <TranslatedText
            fallback="Total Learning Time"
            translationKey="profile.stats.totalLearningTime"
          />
        ),
      };
    }

    if (stat.subtitle === "Courses Completed") {
      return {
        ...stat,
        subtitle: (
          <TranslatedText
            fallback="Courses Completed"
            translationKey="profile.stats.coursesCompleted"
          />
        ),
      };
    }

    if (stat.subtitle === "Day Streak") {
      return {
        ...stat,
        title: String(profile.streakDays),
        subtitle: (
          <TranslatedText
            fallback="Day Streak"
            translationKey="profile.stats.dayStreak"
          />
        ),
      };
    }

    return stat;
  });

  return (
    <section className="grid gap-6 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <ProfileStatCard key={index} {...stat} />
      ))}
    </section>
  );
}
