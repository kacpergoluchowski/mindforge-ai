import { Flame, Layers3, Star, Trophy } from "lucide-react";

import ProfileStatCard from "./ProfileStatCard";

import TranslatedText from "@/components/shared/TranslatedText";
import { getLevelingProgress } from "@/lib/learning/leveling";
import type {
  CurrentProfile,
  ProfileStat,
} from "../../types/profile.types";

type ProfileStatsProps = {
  profile: CurrentProfile;
};

export default function ProfileStats({ profile }: ProfileStatsProps) {
  const leveling = getLevelingProgress(profile.xp);
  const stats: ProfileStat[] = [
    {
      color: "violet",
      icon: Trophy,
      progress: leveling.progressPercent,
      subtitle: (
        <TranslatedText
          fallback="{xp} XP earned"
          translationKey="profile.stats.xpEarned"
          values={{ xp: profile.xp.toLocaleString() }}
        />
      ),
      title: (
        <TranslatedText
          fallback="Level {level}"
          translationKey="profile.stats.level"
          values={{ level: profile.level }}
        />
      ),
    },
    {
      color: "emerald",
      icon: Star,
      progress: Math.min((profile.xp / Math.max(profile.xpGoal, 1)) * 100, 100),
      subtitle: (
        <TranslatedText fallback="Total XP" translationKey="profile.stats.totalXp" />
      ),
      title: profile.xp.toLocaleString(),
    },
    {
      color: "orange",
      icon: Flame,
      progress: Math.min(profile.streakDays * 10, 100),
      subtitle: (
        <TranslatedText
          fallback="Day Streak"
          translationKey="profile.stats.dayStreak"
        />
      ),
      title: String(profile.streakDays),
    },
    {
      color: "blue",
      icon: Layers3,
      progress: Math.min(profile.skills.length * 12, 100),
      subtitle: (
        <TranslatedText fallback="Skills" translationKey="profile.skills" />
      ),
      title: String(profile.skills.length),
    },
  ];

  return (
    <section className="grid min-w-0 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
      {stats.map((stat, index) => (
        <ProfileStatCard key={index} {...stat} />
      ))}
    </section>
  );
}
