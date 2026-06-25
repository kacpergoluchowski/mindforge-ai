import { progressStats } from "../../data/progressData";
import ProgressStatCard from "./ProgressStatCard";

import type { CurrentProfile } from "@/features/profile/types/profile.types";
import type { ProgressSummary } from "../../types/progress.types";

type ProgressStatsProps = {
  profile: CurrentProfile;
  summary: ProgressSummary | null;
};

export default function ProgressStats({ profile, summary }: ProgressStatsProps) {
  const levelProgress =
    profile.xpGoal > 0 ? Math.min((profile.xp / profile.xpGoal) * 100, 100) : 0;
  const stats = progressStats.map((stat) => {
    if (stat.title === "Total XP") {
      return { ...stat, value: profile.xp.toLocaleString() };
    }

    if (stat.title === "Level") {
      return {
        ...stat,
        value: String(profile.level),
        subtitle: `${Math.max(profile.xpGoal - profile.xp, 0).toLocaleString()} XP to next level`,
        progress: levelProgress,
      };
    }

    if (stat.title === "Streak") {
      return { ...stat, value: String(profile.streakDays) };
    }

    if (stat.title === "Rank") {
      return {
        ...stat,
        title: "Courses",
        value: String(summary?.completedCourses ?? 0),
        subtitle: `${summary?.startedCourses ?? 0} started / ${
          summary?.completedLessons ?? 0
        } lessons done`,
      };
    }

    return stat;
  });

  return (
    <section>
      <div className="grid gap-5 lg:grid-cols-4">
        {stats.map((stat) => (
          <ProgressStatCard key={stat.id} {...stat} />
        ))}
      </div>
    </section>
  );
}

